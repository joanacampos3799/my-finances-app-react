import React from "react";
import { Goal } from "../Model/Account";
import { Box, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from "../../components/ui/progress";
import useDateFilter from "../../common/hooks/useDateFilter";

interface Props {
  goal: Goal;
  bgColor: string;
  width: "fit-content" | "full";
}
const GoalCard = ({ goal, bgColor, width }: Props) => {
  const { parseDate } = useDateFilter();
  return (
    <Flex
      bgColor={bgColor}
      borderRadius={"md"}
      direction={"column"}
      gap={4}
      w={width}
      p={"10px"}
    >
      <Center color={"teal.700"} fontWeight={"semibold"} fontSize={"2xl"}>
        {goal.Name}
      </Center>
      <Box>
        <ProgressRoot
          min={0}
          max={goal.Goal}
          value={goal.SavedAmount}
          shape={"full"}
        >
          <ProgressBar />
        </ProgressRoot>
        <HStack
          justifyContent={"space-between"}
          fontSize={"xs"}
          color={"gray.500"}
        >
          <Text>
            {goal.SavedAmount} of {goal.Goal}
          </Text>
          <Text>{parseDate(goal.TargetDate).toDateString()}</Text>
        </HStack>
      </Box>
    </Flex>
  );
};

export default GoalCard;
