import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";

const FixedAndDebts = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh">
      <Flex w="50%">
        <Image src="" />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading color={"teal.700"}>
          Stay on Top of Recurring Payments and Debt
        </Heading>
        <Text>
          Set up your financial routine with MoneyTrack’s fixed transactions
          feature. Whether it's monthly bills like rent or utility payments, or
          long-term debt repayments, MoneyTrack ensures you stay on top of your
          payments.
        </Text>
        <List.Root gap="2" variant="plain" align="center">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Set recurring transactions for fixed expenses.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Manage debt repayment schedules for loans or credit cards.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Visualize debt reduction with progress bars and projections.
          </List.Item>
        </List.Root>
        <Text>
          Set up a tracking for your rent and utility bills. Never worry about
          missing a payment again.
        </Text>
      </Flex>
    </Flex>
  );
};

export default FixedAndDebts;
