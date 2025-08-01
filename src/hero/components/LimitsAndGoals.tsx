import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";
import goal from "../../assets/images/goal.png";

const LimitsandGoals = () => {
  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "75vh" }}
    >
      <Flex w={{ base: "100%", md: "50%" }} order={{ base: 1, md: 0 }}>
        <Image
          src={goal}
          objectFit="contain"
          w={{ base: "100%", md: "90%" }}
          h={{ base: "200px", md: "auto" }}
          borderRadius="md"
          alt="Financial Goals"
        />
      </Flex>
      <Flex
        direction={"column"}
        w={{ base: "100%", md: "50%" }}
        justifyContent={"center"}
        gap={2}
      >
        <Heading color={"teal.700"}>
          Define Financial Goals and Stay on Track
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
          MoneyTrack helps you achieve your financial goals by letting you set
          limits on spending and define savings targets. Track your progress
          over time with easy-to-read visuals and receive nudges when you’re
          nearing your goals or limits.
        </Text>
        <List.Root gap="2" variant="plain" align="center">
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Set spending limits for account types (e.g., credit card or dining).
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Define savings goals for short-term or long-term objectives..
          </List.Item>
          <List.Item>
            <List.Indicator asChild color={"teal.500"}>
              <LuCheck />
            </List.Indicator>
            Get visual feedback on progress toward goals and limits.
          </List.Item>
        </List.Root>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
          Saving for a vacation? Set a 2,000€ goal in MoneyTrack and watch your
          progress bar grow as you save. Plus, set limits on dining out so you
          stay within budget while working toward your goal.
        </Text>
      </Flex>
    </Flex>
  );
};

export default LimitsandGoals;
