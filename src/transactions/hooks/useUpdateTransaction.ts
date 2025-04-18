import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import TransactionRequest from "../model/TransactionRequest";

const apiClient = new APIClient<TransactionRequest>("/transactions");

export function useUpdateTransaction(onUpdate: () => void) {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateTransaction } = useMutation({
    mutationKey: [queryKeys.transactions, mutationKeys.updateTransaction],
    mutationFn: (transaction: TransactionRequest) =>
      apiClient.update(transaction.Id!!, transaction, userId!!, userToken!!),
    onMutate: () => {
      onUpdate();
    },
    onSuccess: (data: TransactionRequest, variables: TransactionRequest) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      toaster.create({
        title: `You have updated the ${variables.Name} transaction`,
        type: "success",
      });
    },
    onError: (error, newTransaction) => {
      toaster.create({
        title: `There was an error updating the account ${newTransaction.Name}`,
        type: "error",
      });
    },
  });

  return updateTransaction;
}
