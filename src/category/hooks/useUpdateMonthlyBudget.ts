import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import MonthlyBudget from "../Model/MonthlyBudget";

const apiClient = new APIClient<MonthlyBudget>("/monthly-budget");

export function useUpdateMonthlyBudget() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateMonthlyBudget } = useMutation({
    mutationKey: [queryKeys.monthlyBudget, mutationKeys.updateMonthlyBudget],
    mutationFn: (monthlyBudget: MonthlyBudget) =>
      apiClient.update(
        monthlyBudget.id!!,
        monthlyBudget,
        userId!!,
        userToken!!
      ),

    onSuccess: (data: MonthlyBudget) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.monthlyBudget] });
      toaster.create({
        title: `You have updated the budget for ${data.month}`,
        type: "success",
      });
    },
  });

  return updateMonthlyBudget;
}
