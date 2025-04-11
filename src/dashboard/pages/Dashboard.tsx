import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";

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
import ValueKPIComponent from "../components/ValueKPIComponent";
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

export default function DashboardPage() {
  const { period, setPeriod } = usePeriodStore();
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
    pendingTransaction.categories = [];
    const { tData } = helper.getPendingData(transactions, pendingTransaction);
    transData = tData;
  }
  const recentTransaction = transData?.slice(-5).reverse();
  const { isAsset, calculateMergedDailyBalances } = useAccountInsights();
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

  const balanceHistoryData = calculateMergedDailyBalances(
    accountData,
    period
  ).map((entry) => ({
    x: entry.date,
    y: entry.balance,
  }));

  const totalBalance = accountData.reduce((totalBalance, account) => {
    return (totalBalance += account.Balance);
  }, 0);

  const totalSavings = accountData.reduce((totalSavings, account) => {
    if (account.Type === 2) return (totalSavings += account.Balance);
    else return totalSavings;
  }, 0);

  const totalInvestements = accountData.reduce((totalInv, account) => {
    if (account.Type === 4) return (totalInv += account.Balance);
    else return totalInv;
  }, 0);

  const totalExpenses = accountData.reduce((totalExpenses, account) => {
    return (totalExpenses += account.Transactions.reduce((acc, transaction) => {
      if (transaction.transactionType === 0) return acc + transaction.Amount;
      else return acc;
    }, 0));
  }, 0);

  const totalIncome = accountData.reduce((totalIncome, account) => {
    return (totalIncome += account.Transactions.reduce((acc, transaction) => {
      if (transaction.transactionType === 1) return acc + transaction.Amount;
      else return acc;
    }, 0));
  }, 0);

  const categorySpending = useMemo(() => {
    const categoryMap: Record<string, { amount: number; color: string }> = {};
    transData.forEach((transaction) => {
      const categories = transaction.categories.filter(
        (cat) => cat.CategoryType == 0
      );
      if (categories.length > 0) {
        const splitAmount = transaction.Amount / categories.length;
        categories.forEach((category) => {
          if (!categoryMap[category.Name]) {
            categoryMap[category.Name] = { amount: 0, color: category.Color };
          }
          categoryMap[category.Name].amount += splitAmount;
        });
      }
    });
    return Object.entries(categoryMap)
      .map(([name, { amount, color }]) => ({ name, amount, color }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [transData]);
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

            <NewTransactionDrawer />
          </Flex>
        </HStack>
      </Box>
      <Flex direction={"row"} mt={2} gap={"3"}>
        <Flex direction={"column"} w={"70%"} gap={"3"}>
          <Flex h={"50%"}>
            <LineChartComponent
              data={balanceHistoryData}
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
          <ValueKPIComponent
            title="Savings"
            IconEl={LuPiggyBank}
            value={totalSavings}
          />
          <ValueKPIComponent
            title="Investements"
            IconEl={LuLineChart}
            value={totalInvestements}
          />
          <ValueKPIComponent
            title="Total Expenses"
            IconEl={LuArrowUpFromLine}
            value={totalExpenses}
          />

          <ValueKPIComponent
            title="Total Income"
            IconEl={LuArrowDownFromLine}
            value={totalIncome}
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
