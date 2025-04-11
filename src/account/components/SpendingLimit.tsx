import { Heading, HStack } from "@chakra-ui/react";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import usePeriodStore from "../../common/hooks/usePeriodStore";
import { timePeriods } from "../../common/constants";
import BudgetProgress from "../../categories/components/BudgetProgress";

const SpendingLimit = () => {
  const { account } = useAccountStore();
  const { period } = usePeriodStore();
  const { parseDate, getStartEndDates } = useDateFilter();
  const { startDate, endDate } = getStartEndDates(period);
  const spent = account.Transactions.filter((f) => {
    const itemDate = parseDate(f.Date);

    return itemDate >= startDate && itemDate <= endDate;
  })
    .map((x) => x.Amount)
    .reduce((acc, val) => acc + val, 0);
  const periodNum = timePeriods.find((t) => t.name === period)?.period!!;
  const totalLimit = account.SpendingLimit!! * periodNum;

  return (
    <HStack w={"full"}>
      <Heading color={"teal.700"} size={"md"} fontWeight={"bold"} w="30%">
        Spending Limit
      </Heading>
      <BudgetProgress spent={spent} budget={totalLimit} />
    </HStack>
  );
};

export default SpendingLimit;
