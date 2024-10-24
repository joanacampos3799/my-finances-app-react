import usePeriodStore from "../../common/hooks/usePeriodStore";
import Transaction from "../../transactions/model/Transaction";
import useDateFilter from "../../common/hooks/useDateFilter";
import {
  Day,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
  getDate,
  getDay,
  getWeekOfMonth,
  startOfMonth,
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
        uniqueCategories
      );
    } else if (period === "Weekly")
      return groupTransactionsByDay(
        transactions,
        dates.startDate,
        dates.endDate,
        parseDate,
        uniqueCategories
      );

    return groupTransactionsByMonth(
      transactions,
      dates.startDate,
      dates.endDate,
      parseDate,
      uniqueCategories
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
  uniqueCategories: Category[]
) => {
  const groupedData: { [key: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = format(parseDate(transaction.Date), "dd/MM/yyyy");

    const weekKey = "Week " + getWeekOfMonth(transactionDate); // Use the week's starting date as the key

    if (!groupedData[weekKey]) {
      groupedData[weekKey] = {};
    }

    transaction.categories.forEach((category) => {
      if (!groupedData[weekKey][category.Name]) {
        groupedData[weekKey][category.Name] = 0;
      }
      groupedData[weekKey][category.Name] += Math.abs(transaction.Amount); // Summing amounts
    });
  });

  const weeksInRange = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: getDay(startOfMonth(startDate)) as Day }
  );

  const groupedWeeks: { [key: string]: { [category: string]: number } } = {};

  weeksInRange.forEach((week) => {
    const weekKey = "Week " + getWeekOfMonth(week);
    groupedWeeks[weekKey] = groupedData[weekKey] || {};

    // Initialize missing categories to 0
    uniqueCategories.forEach((category) => {
      if (!groupedWeeks[weekKey][category.Name]) {
        groupedWeeks[weekKey][category.Name] = 0; // Ensure zero for empty periods
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
  uniqueCategories: Category[]
) => {
  const groupedData: { [key: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = format(parseDate(transaction.Date), "dd/MM/yyyy");

    const dayKey = getDate(transactionDate).toString();

    if (!groupedData[dayKey]) {
      groupedData[dayKey] = {};
    }

    transaction.categories.forEach((category) => {
      if (!groupedData[dayKey][category.Name]) {
        groupedData[dayKey][category.Name] = 0;
      }
      groupedData[dayKey][category.Name] += Math.abs(transaction.Amount); // Summing amounts
    });
  });

  const groupedDays: { [key: string]: { [category: string]: number } } = {};

  const daysInRange = eachDayOfInterval({ start: startDate, end: endDate });
  daysInRange.forEach((day) => {
    const dayKey = getDate(day);
    groupedDays[dayKey] = groupedData[dayKey] || {};

    // Initialize missing categories to 0
    uniqueCategories.forEach((category) => {
      if (!groupedDays[dayKey][category.Name]) {
        groupedDays[dayKey][category.Name] = 0; // Ensure zero for empty periods
      }
    });
  });

  return groupedDays;
};

export const groupTransactionsByMonth = (
  transactions: Transaction[],
  startDate: Date, // Start of the desired period
  endDate: Date, // End of the desired period
  parseDate: (date: DateObj) => Date,
  uniqueCategories: Category[]
) => {
  const groupedData: { [month: string]: { [category: string]: number } } = {};

  // First, group transactions by month and category
  transactions.forEach((transaction) => {
    const transactionDate = format(parseDate(transaction.Date), "dd/MM/yyyy");
    const monthKey = format(startOfMonth(transactionDate), "MMM"); // Use the month as the key

    if (!groupedData[monthKey]) {
      groupedData[monthKey] = {};
    }

    transaction.categories.forEach((category) => {
      if (!groupedData[monthKey][category.Name]) {
        groupedData[monthKey][category.Name] = 0;
      }
      groupedData[monthKey][category.Name] += Math.abs(transaction.Amount); // Summing amounts
    });
  });

  // Generate complete list of months in the period
  const groupedMonths: { [key: string]: { [category: string]: number } } = {};

  const monthsInRange = eachMonthOfInterval({ start: startDate, end: endDate });
  monthsInRange.forEach((month) => {
    const monthKey = format(month, "MMM");

    groupedMonths[monthKey] = groupedData[monthKey] || {};

    // Initialize missing categories to 0
    uniqueCategories.forEach((category) => {
      if (!groupedMonths[monthKey][category.Name]) {
        groupedMonths[monthKey][category.Name] = 0; // Ensure zero for empty periods
      }
    });
  });

  // Return chart-ready data with totals for each period
  return groupedMonths;
};
export default ExpensesChart;
