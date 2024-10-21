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
import FixedAndDebts from "../components/FixedAndDebts";
import LimitsandGoals from "../components/LimitsAndGoals";
import AlertsAndInsights from "../components/AlertsAndInsights";
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
      <Flex direction={"row"} w="100%" px="15px">
        <Flex
          direction={"column"}
          w="40%"
          h="90vh"
          gap={2}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Center>
            <HStack>
              <Heading size={"2xl"} color={"teal.700"}>
                Manage Your Finances Like a{" "}
              </Heading>
              <Heading size={"2xl"} color={"teal.500"}>
                Pro
              </Heading>
            </HStack>
          </Center>
          <Center>
            <Text>
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
        <Flex h="90vh" w="60%">
          <Image src={hero}></Image>
        </Flex>
      </Flex>
      <Flex ref={ref} direction={"column"} px="15px">
        <Overview />
        <TransactionsAndAccounts />
        <BudgetAndCategories />
        <FixedAndDebts />
        <LimitsandGoals />
        <AlertsAndInsights />
        <Benefits />
        <FAQ />
      </Flex>
    </>
  );
}
