import React from "react";
import { Goal } from "../Model/Account";
import DialogComponent from "../../common/components/DialogComponent";
import GoalCard from "./GoalCard";
import NewGoalDrawer from "./NewGoalDrawer";
import useAccountStore from "../hooks/useAccountStore";

interface Props {
  goals: Goal[];
}
const Goals = ({ goals }: Props) => {
  const { account } = useAccountStore();
  return (
    <DialogComponent
      size={"xl"}
      title={"Goals"}
      isDetails={false}
      footer={<NewGoalDrawer accountId={account.Id} />}
    >
      {goals.map((goal) => (
        <GoalCard
          goal={goal}
          key={goal.Id + "-goal"}
          bgColor="gray.100"
          width="fit-content"
        />
      ))}
    </DialogComponent>
  );
};

export default Goals;
