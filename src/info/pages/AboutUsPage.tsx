import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const AboutUsPage = () => {
  return (
    <Flex maxW="6xl">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        About MoneyTrack
      </Heading>
      <Text fontSize="lg" mb={6} textAlign="center">
        MoneyTrack is a personal finance management app designed to help you
        track your transactions, manage budgets, and stay on top of your
        financial goals. We believe in simplicity, security, and efficiency,
        making it easier for you to take control of your finances.
      </Text>
      <Text fontSize="md" textAlign="center">
        Our mission is to empower individuals with the right tools to manage
        their finances, set financial goals, and make informed decisions without
        complicated integrations or external bank connections.
      </Text>
    </Flex>
  );
};

export default AboutUsPage;
