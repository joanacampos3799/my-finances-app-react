import { Flex, Heading, Image, List, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck } from "react-icons/lu";
import recurring from "../../assets/images/recurring.png";
const FixedTransactions = () => {
  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "75vh" }}
    >
      <Flex w={{ base: "100%", md: "50%" }} order={{ base: 1, md: 0 }}>
        <Image
          src={recurring}
          objectFit="contain"
          w={{ base: "100%", md: "90%" }}
          h={{ base: "200px", md: "auto" }}
          borderRadius="md"
          alt="Recurring Payments"
        />
      </Flex>
      <Flex
        direction={"column"}
        w={{ base: "100%", md: "50%" }}
        justifyContent={"center"}
        gap={2}
      >
        <Heading color={"teal.700"} textAlign={"center"}>
          Stay on Top of Recurring Payments
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
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
        </List.Root>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
          Set up a tracking for your rent and utility bills. Never worry about
          missing a payment again.
        </Text>
      </Flex>
    </Flex>
  );
};

export default FixedTransactions;
