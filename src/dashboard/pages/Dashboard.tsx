import { Box, Flex, Heading, HStack, Show, Text } from "@chakra-ui/react";

import TimePeriodMenu from "../../common/components/TimePeriodMenu";
import NewTransactionDrawer from "../../transactions/components/NewTransactionDrawer";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAuthStore from "../../auth/stores/useAuthSore";
import LineChartComponent from "../../common/components/LineChartComponent";
import useTransactions from "../../transactions/hooks/useTransactions";
import { useMutationState } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";
import Transaction from "../../transactions/model/Transaction";
import { HelperEntity } from "../../common/helper";
import RecentTransactionsTable from "../components/RecentTransactionsTable";
import AccountList from "../../accounts/models/AccountList";
import useAccounts from "../../accounts/hooks/useAccounts";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import ValueKPIComponent from "../../common/components/ValueKPIComponent";
import {
  LuArrowDownFromLine,
  LuArrowUpFromLine,
  LuLineChart,
  LuPiggyBank,
  LuWallet,
} from "react-icons/lu";
import { useMemo } from "react";
import HorizontalBarChart from "../../common/components/HorizontalBarChart";
import LoadingPage from "../../common/components/LoadingPage";
import MonthlyMenu from "../../common/components/MonthlyMenu";
import useMonthStore from "../../common/hooks/useMonthStore";
import useBalancesMap from "../hooks/useBalancesMap";
import useDateFilter from "../../common/hooks/useDateFilter";
import { format } from "date-fns";
import DonutChart from "../../common/components/DonutChart";
import useSalaryExpensesSummary from "../hooks/useSalaryExpensesSummary";

export default function DashboardPage() {
  const { period, setPeriod } = usePeriodStore();
  const { month, setMonth } = useMonthStore();
  const { getStartEndDates } = useDateFilter();
  const { user } = useAuthStore();
  const { transactions, isLoading: loadingTrans } = useTransactions();
  const pendingData = useMutationState({
    filters: {
      mutationKey: [queryKeys.transactions],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as Transaction;
    },
  });
  const pendingTransaction = pendingData ? pendingData[0] : null;

  let transData = transactions.data;

  const helper = new HelperEntity<Transaction>();
  if (pendingTransaction) {
    const { tData } = helper.getPendingData(transactions, pendingTransaction);
    transData = tData;
  }
  const recentTransaction = transData?.slice(-5).reverse();
  const { isAsset } = useAccountInsights();
  const { accounts, isLoading: loadingAcc } = useAccounts((accounts) =>
    accounts.filter((acc) => isAsset(acc.Type))
  );

  const pendingAccountData = useMutationState({
    filters: {
      mutationKey: [queryKeys.accounts],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as AccountList;
    },
  });

  const pendingAccount = pendingAccountData ? pendingAccountData[0] : null;
  let accountData = accounts.data;
  const accountHelper = new HelperEntity<AccountList>();
  if (pendingAccount) {
    const { tData } = accountHelper.getPendingData(accounts, pendingAccount);
    accountData = tData;
  }

  const { startDate, endDate } = getStartEndDates(period, month);
  const balancesMap = useBalancesMap(
    format(startDate, "dd/MM/yyyy"),
    format(endDate, "dd/MM/yyyy")
  ).balances;
  const balancesMapMemo = useMemo(() => balancesMap?.data, [balancesMap]);
  const balanceHistoryData = balancesMapMemo?.map((entry) => ({
    x: entry.date,
    y: entry.balance,
  }));

  const totalBalance = accountData.reduce((totalBalance, account) => {
    return (totalBalance += account.Balance);
  }, 0);

  const categorySpending = useMemo(() => {
    const categoryMap: Record<string, { amount: number; color: string }> = {};
    transData.forEach((transaction) => {
      if (transaction.category && transaction.category.CategoryType === 0) {
        if (!categoryMap[transaction.category.Name]) {
          categoryMap[transaction.category.Name] = {
            amount: 0,
            color: transaction.category.Color,
          };
        }
        categoryMap[transaction.category.Name].amount += transaction.Amount;
      }
    });
    return Object.entries(categoryMap)
      .map(([name, { amount, color }]) => ({ name, amount, color }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [transData]);

  const { summary } = useSalaryExpensesSummary(
    format(startDate, "dd/MM/yyyy"),
    format(endDate, "dd/MM/yyyy")
  );

  const data = [
    { value: summary?.totalExpenses, label: "Spent", color: "#f44336" }, // red
    { value: summary?.remaining, label: "Remaining", color: "#e0e0e0" }, // light gray as "background"
  ];
  if (
    loadingAcc ||
    !accounts.isValueSet ||
    loadingTrans ||
    !transactions.isValueSet
  )
    return <LoadingPage />;
  return (
    <Box padding={"15px"}>
      <Box>
        <HStack
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          justifyItems={"flex-end"}
        >
          <Flex direction={"column"}>
            <Heading fontWeight={"bold"} size="3xl" color={"teal.700"}>
              {"Welcome back " + user?.name}
            </Heading>
            <Text mt={2} color={"gray.600"}>
              {"Here's an overview of all your balances"}
            </Text>
          </Flex>
          <Flex
            direction={"row"}
            gap={2}
            alignItems={"flex-start"}
            justifyItems={"flex-end"}
          >
            <TimePeriodMenu period={period} setPeriod={setPeriod} />
            <Show when={period === "Monthly"}>
              <MonthlyMenu month={month} setMonth={setMonth} />
            </Show>
            <NewTransactionDrawer />
          </Flex>
        </HStack>
      </Box>
      <Flex direction={"row"} mt={2} gap={"3"}>
        <Flex direction={"column"} w={"70%"} gap={"3"}>
          <Flex h={"50%"}>
            <LineChartComponent
              data={balanceHistoryData ?? []}
              caption={"Balances overview"}
              width={600}
            />
          </Flex>
          <Flex h={"50%"}>
            <RecentTransactionsTable transactions={recentTransaction} />
          </Flex>
        </Flex>
        <Flex direction={"column"} w={"30%"} gap={"3"}>
          <ValueKPIComponent
            title="Total Balance"
            IconEl={LuWallet}
            value={totalBalance}
          />
          <DonutChart
            key={"Availablekpi"}
            data={data}
            caption={"Available Funds"}
          />
          <HorizontalBarChart
            width={300}
            height={200}
            chartData={categorySpending}
            title={"Top Spending Categories"}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
