import usePeriodStore from "../../common/hooks/usePeriodStore";
import Transaction from "../../transactions/model/Transaction";
import useDateFilter from "../../common/hooks/useDateFilter";
import {
  addMonths,
  Day,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
  getDay,
  getWeekOfMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import StackedBarChart from "../../common/components/StackedBarChart";
import useAccountStore from "../hooks/useAccountStore";
import Category from "../../categories/model/Category";
import DateObj from "../../common/date";
import useMonthStore from "../../common/hooks/useMonthStore";

const ExpensesChart = () => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { account } = useAccountStore();
  const { getStartEndDates, parseDate } = useDateFilter();

  const dates = getStartEndDates(period, month);
  let statementStartDate: Date | null = null;
  if (account.Type === 1 && account.StatementDate) {
    const base = parseDate(account.StatementDate); // use its day-of-month
    const statementDay = base.getDate();
    const y = dates.startDate.getFullYear();
    const m = dates.startDate.getMonth() - 1;
    // clamp to end-of-month to avoid overflow (e.g., Feb 30)
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const safeDay = Math.min(statementDay, daysInMonth);
    statementStartDate = new Date(y, m, safeDay);
  }

  // Compute the active window [periodStart, periodEnd)
  const periodStart =
    account.Type === 1 && statementStartDate
      ? statementStartDate
      : dates.startDate;
  const periodEnd =
    account.Type === 1 && statementStartDate
      ? addMonths(statementStartDate, 1)
      : dates.endDate;

  const transactions = account.Transactions.filter((transaction) => {
    const txDate = parseDate(transaction.Date);
    return txDate >= periodStart && txDate < periodEnd;
  }).filter((t) => t.isCreditCardPayment === false);

  const categories = transactions
    .map((t) => t.category)
    .filter((t) => t != null);
  const uniqueMap = new Map();
  for (const category of categories) {
    const key = category.Name.trim().toLowerCase();
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, category);
    }
  }

  const uniqueCategories = Array.from(uniqueMap.values());

  const groupTransactionsByPeriod = (
    transactions: Transaction[],
    period: string
  ) => {
    if (period === "Monthly") {
      return groupTransactionsByWeek(
        transactions,
        dates.startDate,
        dates.endDate,
        parseDate,
        uniqueCategories,
        account.Type,
        statementStartDate
      );
    } else if (period === "Weekly") {
      return groupTransactionsByDay(
        transactions,
        dates.startDate,
        dates.endDate,
        parseDate,
        uniqueCategories,
        account.Type,
        statementStartDate
      );
    }
    return groupTransactionsByMonth(
      transactions,
      dates.startDate,
      dates.endDate,
      parseDate,
      uniqueCategories,
      account.Type,
      statementStartDate
    );
  };

  const groupedData = groupTransactionsByPeriod(transactions, period);

  const spendingCategories = Object.keys(groupedData).map((key) => ({
    category: key,
    ...(groupedData[key] || {}),
  }));

  const data = uniqueCategories
    .filter((cat) => cat.CategoryType !== 1)
    .map((category) => ({
      label: category.Name,
      color: category.Color,
      dataKey: category.Name,
    }));

  return (
    <StackedBarChart
      height={300}
      width={350}
      title={period === "Monthly" ? "Weekly Expenses" : "Monthly Expenses"}
      chartData={spendingCategories}
      xAxisDataKey={"category"}
      data={data}
    />
  );
};

const groupTransactionsByWeek = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
  parseDate: (date: DateObj) => Date,
  uniqueCategories: Category[],
  accountType: number,
  statementStartDate?: Date | null
) => {
  const groupedData: { [key: string]: { [category: string]: number } } = {};
  const periodStart =
    accountType === 1 && statementStartDate ? statementStartDate : startDate;
  const periodEnd =
    accountType === 1 && statementStartDate
      ? addMonths(statementStartDate, 1)
      : endDate; // Next statement date

  transactions.forEach((transaction) => {
    const transactionDate = parseDate(transaction.Date);

    // Ensure transactions fall within the correct statement period
    if (transactionDate < periodStart || transactionDate >= periodEnd) {
      return;
    }

    // Get the first weekday of the month
    const firstDayOfMonth = startOfMonth(periodStart);
    const weekStartsOn = getDay(firstDayOfMonth) as Day;

    // Get the correct week number
    const weekKey = "Week " + getWeekOfMonth(transactionDate, { weekStartsOn });

    if (!groupedData[weekKey]) {
      groupedData[weekKey] = {};
    }

    if (transaction.category && transaction.category.CategoryType === 0) {
      if (!groupedData[weekKey][transaction.category.Name]) {
        groupedData[weekKey][transaction.category.Name] = 0;
      }
      groupedData[weekKey][transaction.category.Name] += Math.abs(
        transaction.Amount
      );
    }
  });

  // Ensure all weeks in the range are initialized
  const weeksInRange = eachWeekOfInterval(
    { start: periodStart, end: periodEnd },
    { weekStartsOn: getDay(startOfMonth(periodStart)) as Day }
  );
  const groupedWeeks: { [key: string]: { [category: string]: number } } = {};
  weeksInRange.forEach((week, index) => {
    const weekKey = "Week " + (index + 1);
    groupedWeeks[weekKey] = groupedData[weekKey] || {};

    // Initialize missing categories to 0
    uniqueCategories
      .filter((cat) => cat.CategoryType === 0)
      .forEach((category) => {
        if (category.CategoryType === 0)
          if (!groupedWeeks[weekKey][category.Name]) {
            groupedWeeks[weekKey][category.Name] = 0;
          }
      });
  });

  return groupedWeeks;
};

const groupTransactionsByDay = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
  parseDate: (date: DateObj) => Date,
  uniqueCategories: Category[],
  accountType: number,
  statementStartDate?: Date | null
) => {
  const groupedData: { [day: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = parseDate(transaction.Date);
    if (accountType === 1 && statementStartDate) {
      if (
        transactionDate < statementStartDate ||
        transactionDate >= startDate
      ) {
        return;
      }
    } else {
      if (transactionDate < startDate || transactionDate > endDate) {
        return;
      }
    }

    const dayKey = format(transactionDate, "dd/MM");

    if (!groupedData[dayKey]) {
      groupedData[dayKey] = {};
    }

    if (transaction.category && transaction.category.CategoryType === 0) {
      groupedData[dayKey][transaction.category.Name] =
        (groupedData[dayKey][transaction.category.Name] || 0) +
        Math.abs(transaction.Amount);
    }
  });

  const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
  const groupedDays: { [key: string]: { [category: string]: number } } = {};

  daysInRange.forEach((day) => {
    const dayKey = format(day, "dd/MM");
    groupedDays[dayKey] = groupedData[dayKey] || {};

    uniqueCategories
      .filter((cat) => cat.CategoryType !== 1)
      .forEach((category) => {
        if (!groupedDays[dayKey][category.Name]) {
          groupedDays[dayKey][category.Name] = 0;
        }
      });
  });

  return groupedDays;
};

const groupTransactionsByMonth = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
  parseDate: (date: DateObj) => Date,
  uniqueCategories: Category[],
  accountType: number,
  statementStartDate?: Date | null
) => {
  const groupedData: { [month: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = parseDate(transaction.Date);

    if (accountType === 1 && statementStartDate) {
      if (
        transactionDate < statementStartDate ||
        transactionDate >= startDate
      ) {
        return;
      }
    } else {
      if (transactionDate < startDate || transactionDate > endDate) {
        return;
      }
    }
    const monthKey = format(transactionDate, "MMM");

    if (!groupedData[monthKey]) {
      groupedData[monthKey] = {};
    }

    if (transaction.category && transaction.category.CategoryType === 0) {
      groupedData[monthKey][transaction.category.Name] =
        (groupedData[monthKey][transaction.category.Name] || 0) +
        Math.abs(transaction.Amount);
    }
  });

  const monthsInRange = eachMonthOfInterval({ start: startDate, end: endDate });
  const groupedMonths: { [key: string]: { [category: string]: number } } = {};

  monthsInRange.forEach((month) => {
    const monthKey = format(month, "MMM");
    groupedMonths[monthKey] = groupedData[monthKey] || {};

    uniqueCategories
      .filter((cat) => cat.CategoryType !== 1)
      .forEach((category) => {
        if (!groupedMonths[monthKey][category.Name]) {
          groupedMonths[monthKey][category.Name] = 0;
        }
      });
  });

  return groupedMonths;
};

export default ExpensesChart;
