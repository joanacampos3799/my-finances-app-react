import LineChartComponent from "../../common/components/LineChartComponent";
import useAccountInsights from "../../common/hooks/useAccountInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import { format } from "date-fns";
import useMonthStore from "../../common/hooks/useMonthStore";

const BalanceHistory = () => {
  const { period } = usePeriodStore();
  const { month } = useMonthStore();
  const { parseDate } = useDateFilter();
  const { account } = useAccountStore();
  const { calculateDailyBalances } = useAccountInsights();

  const balanceHistoryData = calculateDailyBalances(
    account.DailyBalances,
    period,
    month,
    account
  ).map((entry) => ({
    x: format(parseDate(entry.date), "dd/MM/yyyy"),
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
