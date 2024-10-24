import {
  Badge,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  Show,
  Text,
} from "@chakra-ui/react";
import { accountTypes } from "../../common/constants";
import SpendingLimit from "./SpendingLimit";
import BalanceHistory from "./BalanceHistory";
import useAccountStore from "../hooks/useAccountStore";
import ExpensesChart from "./ExpensesChart";
import Revenue from "./Revenue";

const AccountKPIs = () => {
  const { account } = useAccountStore();
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
              : "No Linkned Institution"}
          </Text>
        </HStack>

        <HStack>
          <Heading color={"teal.700"} size={"md"} fontWeight={"bold"}>
            {" "}
            Initial Balance
          </Heading>

          <FormatNumber
            value={account.InitialBalance}
            style="currency"
            currency="Eur"
          />
        </HStack>

        <Show when={account.SpendingLimit}>
          <SpendingLimit />
        </Show>
      </Flex>
      <Flex direction="row" gap={4}>
        <BalanceHistory />
        <ExpensesChart />
        <Revenue />{" "}
      </Flex>{" "}
    </>
  );
};
export default AccountKPIs;
