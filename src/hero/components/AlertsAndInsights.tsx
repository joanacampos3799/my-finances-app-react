import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";

const AlertsAndInsights = () => {
  return (
    <Flex w="100%" direction={"row"} h="75vh">
      <Flex w="50%">
        <Image src="" />
      </Flex>
      <Flex direction={"column"} w="50%" justifyContent={"center"} gap={2}>
        <Heading color={"teal.700"}>
          Stay Informed with Real-Time Alerts
        </Heading>
        <Text>
          MoneyTrack keeps you updated with instant notifications about
          important financial events, such as upcoming bill payments and low
          account balances.
        </Text>
        <List.Root gap="2" variant="plain" align="center">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Set alerts for important account changes.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Receive notifications for upcoming bill payments.
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Get insights on your spending trends over time.
          </List.Item>
        </List.Root>
        <Text>
          Receive a notification when your account balance dips below a certain
          threshold or when you’re nearing your spending limit in a category.
        </Text>
      </Flex>
    </Flex>
  );
};

export default AlertsAndInsights;
