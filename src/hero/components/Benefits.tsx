import { Flex, Heading, Image, List } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";
import benefits from "../../assets/images/benefits.png";

const Benefits = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh">
      <Flex w="50%">
        <Image src={benefits} />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading>Why MoneyTrack is Perfect for You</Heading>
        <List.Root>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <strong>Complete Control</strong>: Manually track every transaction
            to maintain full awareness of your finances.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <strong>Personalized Budgeting</strong>: Create custom budgets and
            categories that match your spending style.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <strong>Goal Setting</strong>: Set and track your own financial
            goals, and manually update your progress.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <strong>Automated Recurring Payments</strong>: Manually manage fixed
            transactions like rent or loan payments.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <strong>Custom Insights</strong>: You get to decide how and when to
            track your financial data for a personalized experience.
          </List.Item>
        </List.Root>
      </Flex>
    </Flex>
  );
};

export default Benefits;
