import React, { useRef, useState } from "react";
import DrawerComponent from "../../common/components/DrawerComponent";
import { Goal, GoalFormObject } from "../Model/Account";
import { useLoginData } from "../../auth/contexts/AuthContext";
import useForm from "../../common/hooks/useForm";
import useDateFilter from "../../common/hooks/useDateFilter";
import useAddGoal from "../hooks/useAddGoal";
import { useUpdateGoal } from "../hooks/useUpdateAccount";
import { Flex, Input } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import NumberInput from "../../common/components/NumberInput";
import DatePicker from "../../common/components/DatePicker";

interface Props {
  goal?: Goal;
  accountId: number;
}
const NewGoalDrawer = ({ goal, accountId }: Props) => {
  const { userId } = useLoginData();
  const { parseDate } = useDateFilter();
  const { values, resetForm, handleChange } = useForm<GoalFormObject>({
    Name: goal ? goal.Name : "",
    Goal: goal ? goal.Goal : 0,
    TargetDate: goal ? parseDate(goal.TargetDate) : new Date(),
  });

  const ref = useRef<HTMLInputElement>(null);
  const addGoal = useAddGoal(() => resetForm());
  const updateGoal = useUpdateGoal(() => resetForm());
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  return (
    <DrawerComponent
      placement={"end"}
      name={"Account"}
      update={goal !== undefined}
      formName={"new-goal-form"}
      refElement={ref.current}
      open={open}
      setOpen={setOpen}
    >
      <form
        id="new-goal-form"
        onSubmit={(e) => {
          e.preventDefault();

          // Clear error if validation passes
          setError("");
          if (goal) {
            updateGoal({
              Id: goal.Id,
              Name: values.Name,
              Goal: values.Goal,
              SavedAmount: goal.SavedAmount,
              TargetDate: {
                year: values.TargetDate.getFullYear(),
                month: values.TargetDate.getMonth(),
                day: values.TargetDate.getDate(),
              } as DateObj,
              AccountId: accountId,
            });
          } else {
            addGoal({
              Name: values.Name,
              Goal: values.Goal,
              SavedAmount: 0,
              TargetDate: {
                year: values.TargetDate.getFullYear(),
                month: values.TargetDate.getMonth(),
                day: values.TargetDate.getDate(),
              } as DateObj,
              AccountId: accountId,
            });
          }
          setOpen(false);
        }}
      >
        <Flex direction={"column"}>
          <Field label="Name" required mt={6}>
            <Input
              ref={ref}
              id="Name"
              value={values.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              placeholder="Please enter Goal name"
            />
          </Field>

          <Field label="Goal Amount">
            <NumberInput
              number={values.Goal}
              setNumber={(e) => handleChange("Goal", e)}
              isCurrency={false}
            />
          </Field>
          <Field label="Target Date">
            <DatePicker
              selectedDate={values.TargetDate}
              setSelectedDate={(d) => handleChange("TargetDate", d)}
            />
          </Field>
        </Flex>
      </form>
    </DrawerComponent>
  );
};

export default NewGoalDrawer;
