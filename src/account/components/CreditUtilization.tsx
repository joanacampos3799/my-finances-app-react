import { Flex, Heading } from "@chakra-ui/react";
import DonutChart from "../../common/components/DonutChart";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import { add, sub } from "date-fns";
import useInsights from "../../common/hooks/useInsights";

const CreditUtilization = () => {
  const { account } = useAccountStore();
  const { parseDate } = useDateFilter();
  const { getPercentage } = useInsights();

  if (!account || !account.StatementDate || !account.SpendingLimit) {
    return null; // Prevents rendering if data is missing
  }

  // Parse Statement Date (Date you receive the bill)
  const statementDate = new Date(
    account.StatementDate.year,
    account.StatementDate.month - 1,
    account.StatementDate.day
  );
  statementDate.setHours(0, 0, 0, 0); // Start of the day

  // Calculate Next Statement Date (one month after)
  const nextStatementDate = add(statementDate, { months: 1 });

  // Calculate total used credit since the last statement date
  const used =
    account.Transactions?.filter((transaction) => {
      const itemDate = parseDate(transaction.Date);
      return itemDate >= statementDate && itemDate < nextStatementDate;
    })
      .map((t) => t.Amount)
      .reduce((acc, val) => acc + val, 0) || 0;

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
