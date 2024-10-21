import { useParams } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import {
  Badge,
  Box,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import TransactionTable from "../../transactions/components/TransactionTable";
import DebtsTable from "../../debts/components/DebtsTable";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import LineChartComponent from "../../common/components/LineChartComponent";
import { accountTypes } from "../../common/constants";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import AccountHeader from "../components/AccountHeader";
import BreadCrumb from "../components/BreadCrumb";
import StackedBarChart from "../../common/components/StackedBarChart";
import useDateFilter from "../../common/hooks/useDateFilter";
import Transaction from "../../transactions/model/Transaction";
import {
  Day,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  format,
  getDate,
  getDay,
  getWeekOfMonth,
  parse,
  startOfMonth,
} from "date-fns";
import BarChartComponent from "../../common/components/BarChartComponent";

const AccountDetailsPage = () => {
  const { id } = useParams();

  const { account, isLoading, error } = useAccount(+id!);
  const { period } = usePeriodStore();
  const { getStartEndDates } = useDateFilter();
  const dates = getStartEndDates(period);
  const { calculateDailyBalances } = useAccountInsights();

  if (isLoading) return <Spinner />;

  if (error || !account) return <Text>No data</Text>;

  const balanceHistoryData = calculateDailyBalances(
    account.InitialBalance,
    account.Transactions,
    period
  ).map((entry) => ({
    x: entry.date,
    y: entry.balance,
  }));

  const groupTransactionsByPeriod = (
    transactions: Transaction[],
    period: string
  ) => {
    if (period === "Monthly") {
      return groupTransactionsByWeek(
        transactions,
        dates.startDate,
        dates.endDate
      );
    } else if (period == "Weekly")
      return groupTransactionsByDay(
        transactions,
        dates.startDate,
        dates.endDate
      );

    return groupTransactionsByMonth(
      transactions,
      dates.startDate,
      dates.endDate
    );
  };

  const groupedData = groupTransactionsByPeriod(account.Transactions, period);

  const spendingCategories = Object.keys(groupedData).map((key) => ({
    category: key,
    ...(groupedData[key] || {}),
  }));

  const uniqueCategories = Array.from(
    new Set(account.Transactions.flatMap((t) => t.categories))
  );

  const chartProps = prepareIncomeVsExpensesData(
    account.Transactions,
    period,
    dates.startDate,
    dates.endDate
  );
  // Prepare `data` for StackedBarChart
  const data = uniqueCategories.map((category) => ({
    label: category.Name,
    color: category.Color,
    dataKey: category.Name,
  }));

  return (
    <Box>
      <AccountHeader name={account.Name} />
      <Box padding={"15px"}>
        <BreadCrumb name={account.Name} />
        <Flex direction={"column"} gap={4} mt={4}>
          <Heading color={"teal.700"} size={"4xl"}>
            <FormatNumber
              value={account.Balance}
              style="currency"
              currency="Eur"
            />
          </Heading>
          <Flex gap={8} direction={"row"} p="10px">
            <HStack>
              <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
                {" "}
                Account Type
              </Heading>
              <Badge size="md" colorPalette={"teal"}>
                {accountTypes[account.Type].name}
              </Badge>
            </HStack>
            <HStack>
              <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
                {" "}
                Institution
              </Heading>
              <Text>
                {account.Institution
                  ? account.Institution.Name
                  : "No Linkned Institution"}
              </Text>
            </HStack>
            <HStack>
              <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
                {" "}
                Initial Balance
              </Heading>

              <FormatNumber
                value={account.InitialBalance}
                style="currency"
                currency="Eur"
              />
            </HStack>
          </Flex>

          <Flex direction="row" gap={4}>
            <LineChartComponent
              data={balanceHistoryData}
              caption={`${account.Name} Balance History`}
            />

            <StackedBarChart
              height={300}
              width={350}
              title={
                period === "Monthly" ? "Weekly Expenses" : "Monthly Expenses"
              }
              chartData={spendingCategories}
              xAxisDataKey={"category"}
              data={data}
            />

            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              bgColor={"white"}
              borderRadius={"md"}
              p={"10px"}
            >
              <Heading color={"teal.700"}>Revenue</Heading>
              <BarChartComponent
                height={300}
                width={350}
                xAxisDataKey="category" // Key for days, weeks, or months
                chartData={chartProps.chartData}
                data={chartProps.data} // Income vs Expenses
              />
            </Flex>
          </Flex>

          <Flex
            direction={"column"}
            bgColor={"white"}
            borderRadius={"md"}
            p={"10px"}
          >
            <Heading size="md" color={"teal.800"}>
              Transactions
            </Heading>
            <TransactionTable data={account.Transactions} fromAccount />
            <Flex justifyContent={"flex-end"}>
              <NewTransactionDrawer accountId={account.Id} />
            </Flex>
          </Flex>

          <Flex
            direction={"column"}
            bgColor={"white"}
            borderRadius={"md"}
            p={"10px"}
          >
            <Heading size="md" color={"teal.800"}>
              Debts
            </Heading>
            <DebtsTable data={account.Debts} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

const groupTransactionsByWeek = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) => {
  const groupedData: { [key: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = parse(transaction.Date, "dd/MM/yyyy", new Date());

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

  weeksInRange.map((week) => {
    const weekKey = "Week " + getWeekOfMonth(week);

    if (!groupedData[weekKey]) {
      groupedWeeks[weekKey] = {};
    } else {
      groupedWeeks[weekKey] = groupedData[weekKey];
    }
  });

  return groupedWeeks;
};

const groupTransactionsByDay = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) => {
  const groupedData: { [key: string]: { [category: string]: number } } = {};

  transactions.forEach((transaction) => {
    const transactionDate = parse(transaction.Date, "dd/MM/yyyy", new Date());

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
  daysInRange.map((day) => {
    const dayKey = getDate(day);
    if (!groupedData[dayKey]) {
      groupedDays[dayKey] = {};
    } else {
      groupedDays[dayKey] = groupedData[dayKey];
    }
  });

  return groupedDays;
};

export const groupTransactionsByMonth = (
  transactions: Transaction[],
  startDate: Date, // Start of the desired period
  endDate: Date // End of the desired period
) => {
  const groupedData: { [month: string]: { [category: string]: number } } = {};

  // First, group transactions by month and category
  transactions.forEach((transaction) => {
    const transactionDate = parse(transaction.Date, "dd/MM/yyyy", new Date());
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
  monthsInRange.map((month) => {
    const monthKey = format(month, "MMM");

    if (!groupedData[monthKey]) {
      groupedMonths[monthKey] = {};
    } else {
      groupedMonths[monthKey] = groupedData[monthKey];
    }
  });

  // Return chart-ready data with totals for each period
  return groupedMonths;
};

const prepareIncomeVsExpensesData = (
  transactions: Transaction[],
  period: string,
  start: Date,
  end: Date
) => {
  const groupedData: { [key: string]: { income: number; expenses: number } } =
    {};

  transactions.forEach((transaction) => {
    const transactionDate = parse(transaction.Date, "dd/MM/yyyy", new Date());
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
    { label: "Income", dataKey: "income", color: "#4caf50" }, // Green for income
    { label: "Expenses", dataKey: "expenses", color: "#f44336" }, // Red for expenses
  ];

  return { chartData, data };
};

export default AccountDetailsPage;