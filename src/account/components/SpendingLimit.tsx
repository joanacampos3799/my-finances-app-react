import { Flex, Heading, HStack } from "@chakra-ui/react";
import React from "react";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "../../components/ui/progress";
import useInsights from "../../common/hooks/useInsights";
import useAccountStore from "../hooks/useAccountStore";
import useDateFilter from "../../common/hooks/useDateFilter";
import { sub } from "date-fns";

const SpendingLimit = () => {
  const { account } = useAccountStore();
  const { getPercentage } = useInsights();
  const { parseDate } = useDateFilter();
  const dueDate = new Date(
    account.PaymentDueDate!!.year,
    account.PaymentDueDate!!.month - 1,
    account.PaymentDueDate!!.day
  );
  const spent = account.Transactions.filter((f) => {
    const itemDate = parseDate(f.Date);

    return itemDate >= sub(dueDate, { months: 1 }) && itemDate <= dueDate;
  })
    .map((x) => x.Amount)
    .reduce((acc, val) => acc + val, 0);

  const perc = getPercentage(spent, account.SpendingLimit!!);
  return (
    <Flex
      w={"25%"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={"md"}
      p={"10px"}
    >
      <Heading color="teal.700">Spending Limit</Heading>
      {spent} of {account.SpendingLimit!!}
      <ProgressRoot
        min={0}
        max={account.SpendingLimit!!}
        value={
          spent > account.SpendingLimit!! ? account.SpendingLimit!! : spent
        }
        colorPalette="teal"
        shape={"pill"}
      >
        <HStack gap="5">
          <ProgressBar flex="1" />
          <ProgressValueText>{perc}%</ProgressValueText>
        </HStack>
      </ProgressRoot>
    </Flex>
  );
};

export default SpendingLimit;
