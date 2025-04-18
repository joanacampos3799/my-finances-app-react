import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";

const BudgetAndCategories = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh">
      <Flex w="50%">
        <Image src="" />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading color={"teal.700"}>
          Create Budgets Tailored to Your Lifestyle
        </Heading>
        <Text>
          Budgeting is made simple with MoneyTrack. Set spending limits in
          specific categories that matter most to you. Automatically track how
          much you’re spending on groceries, entertainment, or bills, and adjust
          as needed.
        </Text>
        <List.Root gap="2" variant="plain" align="center">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Create custom categories.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Set budget limits for each expense category.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Track budget progress with visual indicators.
          </List.Item>
        </List.Root>
        <Text>
          Set a 200€ monthly limit for dining out. MoneyTrack will automatically
          categorize your restaurant transactions and alert you when you’re
          nearing your limit
        </Text>
      </Flex>
    </Flex>
  );
};

export default BudgetAndCategories;
