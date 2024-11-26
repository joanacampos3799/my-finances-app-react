import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";

import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import { Goal } from "../Model/Account";

const apiClient = new APIClient<Goal>("/goals");

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteGoal } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.deleteGoal],
    mutationFn: (data: Goal) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: Goal, variables: Goal) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      toaster.create({
        title: `You have deleted the ${data.Name} goal`,
        type: "warning",
      });
    },
    onError: (error, newGoal) => {
      toaster.create({
        title: `There was an error deleting the goal ${newGoal.Name}`,
        type: "error",
      });
    },
  });

  return deleteGoal;
}
