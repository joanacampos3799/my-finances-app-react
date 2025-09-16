import { useMutation, useQueryClient } from "@tanstack/react-query";

import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import MonthlyBudget from "../Model/MonthlyBudget";

const apiClient = new APIClient<MonthlyBudget>("/monthly-budget/new");

const useAddMonthlyBudget = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addMonthlyBudget } = useMutation({
    mutationKey: [queryKeys.monthlyBudget, mutationKeys.addMonthlyBudget],
    mutationFn: (monthlyBudget: MonthlyBudget) =>
      apiClient.post(monthlyBudget, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newMonthlyBudget: MonthlyBudget) => {
      toaster.create({
        title: `Monthly Budget for ${newMonthlyBudget.month} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.monthlyBudget],
      });
    },

    onError: (error, newMonthlyBudget) => {
      console.log(error.message);
      toaster.create({
        title: `There was an error adding Monthly Budget for ${newMonthlyBudget.month}`,
        type: "error",
      });
    },
  });

  return addMonthlyBudget;
};

export default useAddMonthlyBudget;
