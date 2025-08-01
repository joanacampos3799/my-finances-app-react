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
import GoalProgress from "./GoalProgress";

const AccountKPIs = () => {
  const { account } = useAccountStore();
  if (!account) return;
  return (
    <>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 2, md: 8 }}
        w="100%"
        justifyContent={"flex-start"}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 2, md: 8 }}
        >
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

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 2, md: 8 }}
        >
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
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          flex={1}
          w={"100%"}
        >
          <Show when={account.SpendingLimit}>
            <SpendingLimit />
          </Show>
        </Flex>
      </Flex>
      <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 2, md: 4 }}>
        <BalanceHistory />
        <Revenue />{" "}
        <Show when={account.Type === 2}>
          <GoalProgress />
        </Show>
        <Show when={account.Type !== 2}>
          <ExpensesChart />
        </Show>
      </Flex>{" "}
    </>
  );
};
export default AccountKPIs;
