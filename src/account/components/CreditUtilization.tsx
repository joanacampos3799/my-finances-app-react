import DonutChart from "../../common/components/DonutChart";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import { add } from "date-fns";
import useInsights from "../../common/hooks/useInsights";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import useMonthStore from "../../common/hooks/useMonthStore";
import { useMemo } from "react";

const CreditUtilization = () => {
  const { account } = useAccountStore();
  const { parseDate, getStartEndDates } = useDateFilter();
  const { period } = usePeriodStore();
  const { month } = useMonthStore();

  const { getPercentage } = useInsights();

  const { startDate, endDate } = useMemo(
    () => getStartEndDates(period, month),
    [getStartEndDates, period, month]
  );

  const stmtDay = useMemo(() => {
    const d = new Date(
      account.StatementDate!!.year,
      account.StatementDate!!.month - 1,
      account.StatementDate!!.day
    ).getDate();
    return d;
  }, [account.StatementDate]);

  const { statementStart, nextStatement } = useMemo(() => {
    const y = startDate.getFullYear();
    const m = startDate.getMonth();
    const daysInMonth = new Date(y, m, 0).getDate();
    const safeDay = Math.min(stmtDay, daysInMonth);
    const start = new Date(y, m - 1, safeDay);
    start.setHours(0, 0, 0, 0);
    const next = add(start, { months: 1 });
    return { statementStart: start, nextStatement: next };
  }, [startDate, stmtDay]);
  // Calculate total used credit since the last statement date
  const used = useMemo(() => {
    return (
      account.Transactions?.filter((t) => {
        const d = parseDate(t.Date);
        return d >= statementStart && d < nextStatement;
      })
        // count only spending; adjust if your amounts are negative for expenses       .filter((t) => t.transactionType === 0)
        .map((t) => Math.abs(t.Amount))
        .reduce((acc, val) => acc + val, 0) || 0
    );
  }, [account.Transactions, parseDate, statementStart, nextStatement]);
  if (!account || !account.StatementDate || !account.SpendingLimit) {
    return null; // Prevents rendering if data is missing
  }
  // Calculate available credit
  const available = Math.max(account.SpendingLimit - used, 0);

  // Prepare data for DonutChart
  const data = [
    { label: "Used", value: used },
    { label: "Available", value: available },
  ];

  // Calculate credit utilization percentage
  const perc = getPercentage(used, account.SpendingLimit);

  return (
    <DonutChart
      data={data}
      caption={`Your Credit Utilization is at ${perc}%`}
      heading="Credit Utilization"
    />
  );
};

export default CreditUtilization;
