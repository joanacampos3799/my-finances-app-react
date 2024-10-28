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
  if (!account) return;
  const dueDate = new Date(
    account.PaymentDueDate!!.year,
    account.PaymentDueDate!!.month - 1,
    account.PaymentDueDate!!.day
  );
  return (
    <>
      {/* Responsive Flex for Account Information */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        p="10px"
        w="100%"
        justifyContent={"flex-start"}
      >
        {/* First Row Group */}
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <HStack>
            <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
              Account Type
            </Heading>
            <Badge
              size="md"
              colorPalette="teal"
              borderColor={"teal.300"}
              borderWidth={1}
            >
              {accountTypes[account.Type].name}
            </Badge>
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
              Institution
            </Heading>
            <Text>
              {account.Institution
                ? account.Institution.Name
                : "No Linked Institution"}
            </Text>
          </HStack>
        </Flex>

        {/* Second Row Group */}
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <HStack>
            <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
              Next Payment Due
            </Heading>
            <Text>{dueDate.toDateString()}</Text>
          </HStack>
          <HStack>
            <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
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
              Interest Rate
            </Heading>
            <FormatNumber value={account.Interest ?? 0} style="percent" />
          </HStack>
        </Flex>
      </Flex>

      <Flex direction={{ base: "column", lg: "row" }} gap={4} w={"100%"}>
        <BalanceHistory />
        <ExpensesChart />
        <CreditUtilization />
      </Flex>
    </>
  );
};

export default CreditKPIs;
