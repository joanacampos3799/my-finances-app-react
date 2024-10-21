import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const TermsPage = () => {
  return (
    <Flex maxW="6xl">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Terms of Service
      </Heading>
      <Text fontSize="md" mb={6}>
        These terms govern your use of MoneyTrack, and by using our services,
        you agree to be bound by them.
      </Text>
      <Text fontSize="md">
        You are responsible for ensuring that all information you provide to
        MoneyTrack is accurate. We reserve the right to modify or terminate
        services for any user who violates these terms.
      </Text>
    </Flex>
  );
};

export default TermsPage;
