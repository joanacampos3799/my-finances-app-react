import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";
import benefits from "../../assets/images/benefits.png";

const Benefits = () => {
  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "75vh" }}
    >
      <Flex w={{ base: "100%", md: "50%" }} order={{ base: 1, md: 0 }}>
        <Image
          src={benefits}
          objectFit="contain"
          w={{ base: "100%", md: "90%" }}
          h={{ base: "200px", md: "auto" }}
          borderRadius="md"
        />
      </Flex>
      <Flex
        direction={"column"}
        w={{ base: "100%", md: "50%" }}
        justifyContent={"center"}
        gap={2}
      >
        <Heading>Why MoneyTrack is Perfect for You</Heading>
        <List.Root variant="plain">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              <strong>Complete Control:</strong> Manually track every
              transaction to maintain full awareness of your finances.
            </Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              <strong>Personalized Budgeting:</strong> Create custom budgets and
              categories that match your spending style.
            </Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              <strong>Goal Setting:</strong> Set and track your own financial
              goals, and manually update your progress.
            </Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              <strong>Automated Recurring Payments:</strong> Manually manage
              fixed transactions like rent or loan payments.
            </Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              <strong>Custom Insights:</strong> You get to decide how and when
              to track your financial data for a personalized experience.
            </Text>
          </List.Item>
        </List.Root>
      </Flex>
    </Flex>
  );
};

export default Benefits;
