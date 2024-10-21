import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  Heading,
  Separator,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { GiReceiveMoney } from "react-icons/gi";

const Footer = () => {
  return (
    <Flex bg="gray.400" color="gray.200" py={10}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
          {/* About Us Section */}
          <Stack gap={4}>
            <HStack mb={2}>
              <Icon as={GiReceiveMoney} boxSize={6} />
              <Heading as={"h5"} fontSize={"lg"}>
                MoneyTrack.
              </Heading>
            </HStack>

            <Text fontSize="sm">
              Manage your financial transactions, set categories, and stay on
              top of your goals with MoneyTrack.
            </Text>
          </Stack>

          {/* Quick Links Section */}
          <Stack gap={4}>
            <Heading as="h5" fontSize="lg" mb={2} color="white">
              Quick Links
            </Heading>
            <Link href="#features" _hover={{ color: "gray.600" }}>
              Features
            </Link>
            <Link href="/pricing" _hover={{ color: "gray.600" }}>
              Pricing
            </Link>
            <Link href="/about-us" _hover={{ color: "gray.600" }}>
              About Us
            </Link>
            <Link href="#support" _hover={{ color: "gray.600" }}>
              Support
            </Link>
          </Stack>

          {/* Legal Section */}
          <Stack gap={4}>
            <Heading as="h5" fontSize="lg" mb={2} color="white">
              Legal
            </Heading>
            <Link href="/terms" _hover={{ color: "gray.600" }}>
              Terms of Service
            </Link>
            <Link href="/privacy" _hover={{ color: "gray.600" }}>
              Privacy Policy
            </Link>
            <Link href="#faq" _hover={{ color: "gray.600" }}>
              FAQ
            </Link>
          </Stack>
        </SimpleGrid>

        {/* Footer Bottom Section */}
        <Separator my={6} />
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} MoneyTrack. All rights reserved.
          </Text>
          <HStack gap={6}>
            <Link href="#terms" fontSize="sm">
              Terms
            </Link>
            <Link href="#privacy" fontSize="sm">
              Privacy
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Footer;
