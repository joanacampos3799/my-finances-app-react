import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import { Goal } from "../Model/Account";

const apiClient = new APIClient<Goal>("/goals/new");

const useAddGoal = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addGoal } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.addGoal],
    mutationFn: (goal: Goal) => apiClient.post(goal, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newGoal: Goal) => {
      toaster.create({
        title: `Goal ${newGoal.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.accounts],
      });
    },

    onError: (error, newGoal) => {
      toaster.create({
        title: `There was an error adding the goal ${newGoal.Name}`,
        type: "error",
      });
    },
  });

  return addGoal;
};

export default useAddGoal;
