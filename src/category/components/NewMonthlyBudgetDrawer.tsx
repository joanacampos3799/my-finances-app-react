import { useState, useEffect, useMemo } from "react";
import FormDialog from "../../common/components/FormDialog";
import { Flex } from "@chakra-ui/react";
import NumberInput from "../../common/components/NumberInput";
import { Field } from "../../components/ui/field";
import { useUpdateMonthlyBudget } from "../hooks/useUpdateMonthlyBudget";
import useAddMonthlyBudget from "../hooks/useAddMonthlyBudget";
import useMonthStore from "../../common/hooks/useMonthStore";
interface Props {
  budget?: number;
  monthlyBudgetId?: number;
  categoryId: number;
}
const NewMonthlyBudgetDrawer = ({
  budget,
  monthlyBudgetId,
  categoryId,
}: Props) => {
  const id = useMemo(() => monthlyBudgetId, [monthlyBudgetId]);
  const [newBudget, setBudget] = useState<number>(budget ?? 0);
  const updateMonthlyBudget = useUpdateMonthlyBudget();
  const addMonthlyBudget = useAddMonthlyBudget(() => {});
  const { month } = useMonthStore();
  useEffect(() => {
    setBudget(budget ?? 0);
  }, [budget]);

  return (
    <FormDialog
      label="Set Monthly Budget"
      formName="new-monthly-budget"
      initialEl={null}
    >
      <form
        id="new-monthly-budget"
        onSubmit={(e) => {
          e.preventDefault();

          if (budget && id) {
            updateMonthlyBudget({
              id: id,
              budget: newBudget,
              month: month,
              categoryId: categoryId,
            });
          } else {
            addMonthlyBudget({
              budget: newBudget,
              month: month,
              categoryId: categoryId,
            });
          }
        }}
      >
        <Flex direction={"column"} gap={2}>
          <Field label="Initial Account Balance">
            <NumberInput
              number={"" + newBudget}
              setNumber={(e) => setBudget(Number(e))}
              isCurrency
            />
          </Field>
        </Flex>
      </form>
    </FormDialog>
  );
};

export default NewMonthlyBudgetDrawer;
