import {
  Badge,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

import useAccountStore from "../hooks/useAccountStore";
import { accountTypes } from "../../common/constants";
import BalanceHistory from "./BalanceHistory";
import ExpensesChart from "./ExpensesChart";
import CreditUtilization from "./CreditUtilization";

const CreditKPIs = () => {
  const { account } = useAccountStore();
  const dueDate = new Date(
    account.PaymentDueDate!!.year,
    account.PaymentDueDate!!.month - 1,
    account.PaymentDueDate!!.day
  );
  return (
    <>
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
              : "No Linked Institution"}
          </Text>
        </HStack>
        <HStack>
          <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
            {" "}
            Next Payment Due
          </Heading>

          {dueDate.toDateString()}
        </HStack>

        <HStack>
          <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
            {" "}
            Total Credit Limit
          </Heading>

          <FormatNumber
            value={account.SpendingLimit ?? 0}
            style="currency"
            currency="Eur"
          />
        </HStack>
        <HStack>
          <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
            {" "}
            Interest Rate
          </Heading>

          <FormatNumber value={account.Interest ?? 0} style="percent" />
        </HStack>
      </Flex>

      <Flex direction="row" gap={4}>
        <BalanceHistory />
        <ExpensesChart />
        <CreditUtilization />
      </Flex>
    </>
  );
};

export default CreditKPIs;
