import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../../common/apiClient";
import Transaction from "../Transaction";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../../common/constants";
import { toaster } from "../../../components/ui/toaster";

const apiClient = new APIClient<Transaction>("/transactions");

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteTransaction } = useMutation({
    mutationKey: [queryKeys.transactions, mutationKeys.deleteTransaction],
    mutationFn: (data: Transaction) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: Transaction, variables: Transaction) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.transactions] });
      toaster.create({
        title: `You have deleted the ${data.Name} transaction`,
        type: "warning",
      });
    },
    onError: (error, newTransaction) => {
      toaster.create({
        title: `There was an error deleting the transaction ${newTransaction.Name}`,
        type: "error",
      });
    },
  });

  return deleteTransaction;
}
