import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const PricingPage = () => {
  return (
    <Flex maxW="6xl">
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Pricing Plans
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        {/* Free Plan */}
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          <Heading as="h3" size="lg" mb={4}>
            Free Plan
          </Heading>
          <Text fontSize="lg">
            Basic features to track and manage your finances.
          </Text>
          <Stack mt={4} gap={3}>
            <Text>- Track transactions</Text>
            <Text>- Set categories</Text>
            <Text>- Manage accounts manually</Text>
            <Text>- Add fixed transactions</Text>
          </Stack>
          <Button
            mt={6}
            colorPalette="teal"
            variant="outline"
            borderColor={"teal.500"}
            size="lg"
          >
            Get Started
          </Button>
        </Box>

        {/* Pro Plan */}
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          <Heading as="h3" size="lg" mb={4}>
            Pro Plan
          </Heading>
          <Text fontSize="lg">$5/month for enhanced features and support.</Text>
          <Stack mt={4} gap={3}>
            <Text>- All Free features</Text>
            <Text>- Set financial goals</Text>
            <Text>- Custom account limits</Text>
            <Text>- Priority support</Text>
          </Stack>
          <Button mt={6} colorScheme="blue" size="lg">
            Choose Pro
          </Button>
        </Box>

        {/* Premium Plan */}
        <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          <Heading as="h3" size="lg" mb={4}>
            Premium Plan
          </Heading>
          <Text fontSize="lg">
            $10/month for full features and unlimited support.
          </Text>
          <Stack mt={4} gap={3}>
            <Text>- All Pro features</Text>
            <Text>- Unlimited transaction tracking</Text>
            <Text>- Advanced analytics</Text>
            <Text>- Dedicated financial advisor</Text>
          </Stack>
          <Button mt={6} colorScheme="blue" size="lg">
            Choose Premium
          </Button>
        </Box>
      </SimpleGrid>
    </Flex>
  );
};

export default PricingPage;
