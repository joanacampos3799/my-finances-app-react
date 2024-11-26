import { Flex } from "@chakra-ui/react";
import { Goal } from "../Model/Account";
import Goals from "./Goals";
import GoalCard from "./GoalCard";

interface Props {
  goals: Goal[];
}
const MainGoal = ({ goals }: Props) => {
  const mainGoal = goals.find((g) => g.Name === "Main Goal")!!;
  return (
    <Flex
      direction={"column"}
      borderRadius={"md"}
      bgColor={"white"}
      flex={1}
      p={"10px"}
      justifyContent={"space-between"}
      gap={4}
      position={"relative"}
    >
      <Flex position={"relative"} justifyContent={"flex-end"}>
        <Goals goals={goals} />
      </Flex>

      <GoalCard goal={mainGoal} bgColor="white" width="full" />
    </Flex>
  );
};

export default MainGoal;
