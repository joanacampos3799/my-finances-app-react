import React from "react";
import LineChartComponent from "../../common/components/LineChartComponent";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAccountStore from "../hooks/useAccountStore";

const BalanceHistory = () => {
  const { period } = usePeriodStore();
  const { account } = useAccountStore();
  const { calculateDailyBalances } = useAccountInsights();
  const balanceHistoryData = calculateDailyBalances(
    account.InitialBalance,
    account.Transactions,
    period
  ).map((entry) => ({
    x: entry.date,
    y: entry.balance,
  }));

  return (
    <LineChartComponent
      data={balanceHistoryData}
      caption={`${account.Name} Balance History`}
    />
  );
};

export default BalanceHistory;
