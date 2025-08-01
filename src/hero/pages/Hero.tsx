import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import hero from "../../assets/images/hero.png";

import { useAuth } from "@clerk/clerk-react";

import { useEffect, useRef } from "react";
import { useAuthActions } from "../../auth/hooks/useAuthActions";
import { LinkButton } from "../../components/ui/link-button";
import Overview from "../components/Overview";
import TransactionsAndAccounts from "../components/TransactionsAndAccounts";
import BudgetAndCategories from "../components/BudgetAndCategories";
import FixedTransactions from "../components/FixedAndDebts";
import LimitsandGoals from "../components/LimitsAndGoals";

import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";

export default function HeroPage() {
  const { signout } = useAuthActions();
  const { isSignedIn } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isSignedIn) signout();
  }, [isSignedIn, signout]);

  const handleCLick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        w="100%"
        px={{ base: "8px", md: "15px" }}
        py={{ base: 4, md: 0 }}
        align="center"
        minH={{ base: "auto", md: "90vh" }}
        gap={{ base: 6, md: 0 }}
      >
        <Flex
          direction="column"
          w={{ base: "100%", md: "40%" }}
          minH={{ base: "auto", md: "90vh" }}
          gap={4}
          justifyContent="center"
          alignContent="center"
        >
          <Center>
            <HStack>
              <Heading
                size={{ base: "lg", md: "2xl" }}
                color="teal.700"
                textAlign={{ base: "center", md: "left" }}
              >
                Manage Your Finances Like a{" "}
              </Heading>
              <Heading
                size={{ base: "lg", md: "2xl" }}
                color="teal.500"
                textAlign={{ base: "center", md: "left" }}
              >
                Pro
              </Heading>
            </HStack>
          </Center>
          <Center>
            <Text fontSize={{ base: "md", md: "lg" }} textAlign="justify">
              With MoneyTrack., managing your finances has never been easier.
              Track every transaction, set categories, and link multiple
              accounts across different financial institutions. Stay organized
              by having all your accounts — checking, savings, credit cards, and
              more — at your fingertips.
            </Text>
          </Center>
          <Center>
            <HStack>
              <Button
                onClick={handleCLick}
                colorPalette={"teal"}
                borderColor={"teal.500"}
                variant={"outline"}
              >
                Learn More
              </Button>
              <LinkButton colorPalette={"teal"} href="/sign-up">
                Get Started
              </LinkButton>
            </HStack>
          </Center>
        </Flex>
        <Flex
          w={{ base: "100%", md: "60%" }}
          minH={{ base: "200px", md: "90vh" }}
          justify="center"
          align="center"
        >
          <Image
            src={hero}
            objectFit="contain"
            w={{ base: "100%", md: "90%" }}
            h={{ base: "200px", md: "auto" }}
            borderRadius="md"
            alt="Hero"
          ></Image>
        </Flex>
      </Flex>
      <Flex ref={ref} direction={"column"} px={{ base: "8px", md: "15px" }}>
        <Overview />
        <TransactionsAndAccounts />
        <BudgetAndCategories />
        <FixedTransactions />
        <LimitsandGoals />
        <Benefits />
        <FAQ />
      </Flex>
    </>
  );
}
