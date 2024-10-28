import { Flex, Heading } from "@chakra-ui/react";
import DonutChart from "../../common/components/DonutChart";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import { sub } from "date-fns";
import useInsights from "../../common/hooks/useInsights";

const CreditUtilization = () => {
  const { account } = useAccountStore();
  const { parseDate } = useDateFilter();
  const { getPercentage } = useInsights();
  const dueDate = new Date(
    account.PaymentDueDate!!.year,
    account.PaymentDueDate!!.month - 1,
    account.PaymentDueDate!!.day
  );
  const used = account.Transactions.filter((f) => {
    const itemDate = parseDate(f.Date);

    return itemDate >= sub(dueDate, { months: 1 }) && itemDate <= dueDate;
  })
    .map((x) => x.Amount)
    .reduce((acc, val) => acc + val, 0);

  const data = [
    { label: "Used", value: used },
    { label: "Available", value: account.SpendingLimit!! - used },
  ];
  const perc = getPercentage(used, account.SpendingLimit!!);
  return (
    <DonutChart
      data={data}
      caption={`Your Credit Utilization is at ${perc}%`}
      heading="Credit Utilization"
    />
  );
};

export default CreditUtilization;
