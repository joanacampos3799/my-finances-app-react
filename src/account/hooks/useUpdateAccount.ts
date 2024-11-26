import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import { Goal } from "../Model/Account";

const apiClient = new APIClient<Goal>("/goal");

export function useUpdateGoal(onUpdate: () => void) {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateGoal } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.updateGoal],
    mutationFn: (account: Goal) =>
      apiClient.update(account.Id!!, account, userId!!, userToken!!),
    onMutate: () => onUpdate(),
    onSuccess: (data: Goal, variables: Goal) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      toaster.create({
        title: `You have updated the ${variables.Name} goal`,
        type: "success",
      });
    },
    onError: (error, newGoal) => {
      toaster.create({
        title: `There was an error updating the goal ${newGoal.Name}`,
        type: "error",
      });
    },
  });

  return updateGoal;
}
