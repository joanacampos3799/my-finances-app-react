import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

const TransactionsAndAccounts = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh">
      <Flex w="50%">
        <Image src="" />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading color={"teal.700"}>
          Keep Track of Every Financial Transaction
        </Heading>
        <Text>
          MoneyTrack enables you to monitor all your transactions in real time.
          Whether it's daily purchases, bill payments, or large expenses, you
          can easily track everything and categorize transactions automatically.
        </Text>
        <List.Root gap="2" variant="plain" align="center">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Add multiple financial accounts (bank accounts, credit cards,
            investment accounts) from different institutions.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            View transaction history across all accounts in one place.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Set custom categories for your expenses (e.g., dining, bills,
            entertainment), for your income (e.g. salary, investments) or for
            both (e.g. gifts, savings).
          </List.Item>
        </List.Root>
        <Text>
          Imagine having your checking account, savings, and credit cards all in
          one app. See a transaction come through instantly, assign it to the
          right category, and track your spending effortlessly.
        </Text>
      </Flex>
    </Flex>
  );
};

export default TransactionsAndAccounts;
