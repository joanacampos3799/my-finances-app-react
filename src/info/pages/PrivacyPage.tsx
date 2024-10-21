import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const PrivacyPage = () => {
  return (
    <Flex maxW="6xl">
      <Heading as="h1" size="xl" mb={4} textAlign="center">
        Privacy Policy
      </Heading>
      <Text fontSize="md" mb={6}>
        At MoneyTrack, we value your privacy and are committed to protecting
        your personal data. This Privacy Policy explains how we collect, use,
        and safeguard your information.
      </Text>
      <Text fontSize="md">
        By using MoneyTrack, you agree to the collection and use of information
        in accordance with this policy. We do not share your data with third
        parties and ensure your information is secured through industry-standard
        practices.
      </Text>
    </Flex>
  );
};

export default PrivacyPage;
