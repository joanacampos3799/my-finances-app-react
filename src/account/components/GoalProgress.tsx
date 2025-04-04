import React from "react";
import useAccountStore from "../hooks/useAccountStore";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  ProgressCircle,
  Text,
} from "@chakra-ui/react";
import { LinearProgress } from "@mui/material";
import SetUpGoal from "./SetUpGoal";
import { ProgressBar, ProgressRoot } from "../../components/ui/progress";

const GoalProgress = () => {
  const { account } = useAccountStore();

  if (!account.Goal || account.Goal <= 0) {
    return (
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"white"}
        borderRadius={"md"}
        flex={1}
        p={"10px"}
        gap={3}
      >
        <Text fontSize="md">No savings goal set for this account.</Text>
        <SetUpGoal />
      </Flex>
    );
  }

  return (
    <Flex
      direction={"column"}
      bgColor={"white"}
      borderRadius={"md"}
      justifyContent={"space-between"}
      flex={1}
      p={"10px"}
      gap={3}
    >
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Heading color={"teal.700"}>Savings Goal Progress</Heading>
      </Flex>

      <Flex direction={"column"} gap={"2"}>
        <Text fontSize="sm" color="teal-">
          €{account.Balance.toFixed(2)} of €{account.Goal.toFixed(2)} saved
        </Text>

        <ProgressRoot
          w={"100%"}
          min={0}
          max={account.Goal}
          value={
            account.Balance > account.Goal ? account.Goal : account.Balance
          }
          colorPalette={"teal"}
          shape={"full"}
        >
          <HStack gap="5">
            <ProgressBar flex="1" />
          </HStack>
        </ProgressRoot>
      </Flex>
      <Flex
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        w="100%"
      >
        <SetUpGoal />
      </Flex>
    </Flex>
  );
};

export default GoalProgress;
