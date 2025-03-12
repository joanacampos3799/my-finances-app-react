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

const ExpensesChart = () => {
  const { period } = usePeriodStore();
  const { account } = useAccountStore();
  const { getStartEndDates, parseDate } = useDateFilter();

  const dates = getStartEndDates(period);
  const uniqueCategories = Array.from(
    new Set(account.Transactions.flatMap((t) => t.categories))
  );
  // Handle credit card statement period
  let statementStartDate: Date | null = null;
  if (account.Type === 1 && account.StatementDate) {
    const statementDate = parseDate(account.StatementDate);

    // If today is on or after the statement date, use this month’s statement period
    if (new Date() >= statementDate) {
      statementStartDate = statementDate;
    } else {
      // Otherwise, we're still in the previous period
      statementStartDate = subMonths(statementDate, 1);
    }
  }
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

  const groupedData = groupTransactionsByPeriod(account.Transactions, period);

  const spendingCategories = Object.keys(groupedData).map((key) => ({
    category: key,
    ...(groupedData[key] || {}),
  }));

  const data = uniqueCategories.map((category) => ({
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

    transaction.categories.forEach((category) => {
      if (!groupedData[weekKey][category.Name]) {
        groupedData[weekKey][category.Name] = 0;
      }
      groupedData[weekKey][category.Name] += Math.abs(transaction.Amount);
    });
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
    uniqueCategories.forEach((category) => {
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

    transaction.categories.forEach((category) => {
      groupedData[dayKey][category.Name] =
        (groupedData[dayKey][category.Name] || 0) +
        Math.abs(transaction.Amount);
    });
  });

  const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
  const groupedDays: { [key: string]: { [category: string]: number } } = {};

  daysInRange.forEach((day) => {
    const dayKey = format(day, "dd/MM");
    groupedDays[dayKey] = groupedData[dayKey] || {};

    uniqueCategories.forEach((category) => {
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

    transaction.categories.forEach((category) => {
      groupedData[monthKey][category.Name] =
        (groupedData[monthKey][category.Name] || 0) +
        Math.abs(transaction.Amount);
    });
  });

  const monthsInRange = eachMonthOfInterval({ start: startDate, end: endDate });
  const groupedMonths: { [key: string]: { [category: string]: number } } = {};

  monthsInRange.forEach((month) => {
    const monthKey = format(month, "MMM");
    groupedMonths[monthKey] = groupedData[monthKey] || {};

    uniqueCategories.forEach((category) => {
      if (!groupedMonths[monthKey][category.Name]) {
        groupedMonths[monthKey][category.Name] = 0;
      }
    });
  });

  return groupedMonths;
};

export default ExpensesChart;
