import { Flex, Heading } from "@chakra-ui/react";
import BarChartComponent from "../../common/components/BarChartComponent";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAccountStore from "../hooks/useAccountStore";
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
import Transaction from "../../transactions/model/Transaction";
import DateObj from "../../common/date";

const Revenue = () => {
  const { period } = usePeriodStore();
  const { account } = useAccountStore();
  const { getStartEndDates, parseDate } = useDateFilter();
  const dates = getStartEndDates(period);
  const chartProps = prepareIncomeVsExpensesData(
    account.Transactions,
    period,
    dates.startDate,
    dates.endDate,
    account.Type,
    parseDate
  );

  const chartLabel = account.Type === 2 ? "Deposits vs Withdrawals" : "Revenue";
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      flex={1}
      p={"10px"}
    >
      <Heading color={"teal.700"}>{chartLabel}</Heading>
      <BarChartComponent
        height={300}
        width={350}
        xAxisDataKey="category" // Key for days, weeks, or months
        chartData={chartProps.chartData}
        data={chartProps.data} // Income vs Expenses
      />
    </Flex>
  );
};

const prepareIncomeVsExpensesData = (
  transactions: Transaction[],
  period: string,
  start: Date,
  end: Date,
  accountType: number,
  parseDate: (date: DateObj) => Date
) => {
  const groupedData: { [key: string]: { income: number; expenses: number } } =
    {};

  transactions.forEach((transaction) => {
    const transactionDate = parseDate(transaction.Date);
    if (transactionDate < start || transactionDate > end) return;
    let periodKey = "";

    // Grouping based on the selected period (day, week, month)
    if (period === "Weekly") {
      periodKey = getDate(transactionDate).toString();
    } else if (period === "Monthly") {
      periodKey = "Week " + getWeekOfMonth(transactionDate);
    } else {
      periodKey = format(startOfMonth(transactionDate), "MMM");
    }

    // Initialize the period if not already done
    if (!groupedData[periodKey]) {
      groupedData[periodKey] = { income: 0, expenses: 0 };
    }

    // Calculate income and expenses
    if (transaction.transactionType === 1) {
      groupedData[periodKey].income += transaction.Amount;
    } else {
      groupedData[periodKey].expenses += Math.abs(transaction.Amount); // Treat as positive for chart
    }
  });

  let periods: Date[] = [];
  if (period === "Weekly") {
    periods = eachDayOfInterval({ start, end });
  } else if (period === "Monthly") {
    periods = eachWeekOfInterval(
      { start, end },
      { weekStartsOn: getDay(startOfMonth(start)) as Day }
    );
  } else {
    periods = eachMonthOfInterval({ start, end });
  }

  // Format the periods and fill in missing data with zeroes
  const chartData = periods.map((date) => {
    let periodKey: string;
    if (period === "Weekly") {
      periodKey = getDate(date).toString();
    } else if (period === "Monthly") {
      const start: Day = getDay(startOfMonth(date)) as Day;
      periodKey = "Week " + getWeekOfMonth(date, { weekStartsOn: start });
    } else {
      periodKey = format(startOfMonth(date), "MMM");
    }
    return {
      category: periodKey,
      income: groupedData[periodKey]?.income || 0,
      expenses: groupedData[periodKey]?.expenses || 0,
    };
  });

  // Prepare `data` for the chart, defining the income and expense series
  const data = [
    {
      label: accountType === 2 ? "Deposits" : "Income",
      dataKey: "income",
      color: "#4caf50",
    }, // Green for income
    {
      label: accountType === 2 ? "Withdrawals" : "Expenses",
      dataKey: "expenses",
      color: "#f44336",
    }, // Red for expenses
  ];

  return { chartData, data };
};
export default Revenue;
