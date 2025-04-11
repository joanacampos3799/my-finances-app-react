import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import FixedTransaction from "../model/FixedTransaction";

const apiClient = new APIClient<FixedTransaction>("/fixed-transactions");

export function useUpdateFixedTransaction() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateFixedTransaction } = useMutation({
    mutationKey: [
      queryKeys.fixedTransactions,
      mutationKeys.updateFixedTransaction,
    ],
    mutationFn: (fixed: FixedTransaction) =>
      apiClient.update(fixed.Id!!, fixed, userId!!, userToken!!),
    onSuccess: (data: FixedTransaction, variables: FixedTransaction) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.fixedTransactions],
      });
      toaster.create({
        title: `You have updated the ${variables.Name} fixed transaction`,
        type: "success",
      });
    },
    onError: (error, newFixed) => {
      toaster.create({
        title: `There was an error updating the ${newFixed.Name} fixed transaction`,
        type: "error",
      });
    },
  });

  return updateFixedTransaction;
}
