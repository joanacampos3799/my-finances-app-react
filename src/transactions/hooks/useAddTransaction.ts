import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import TransactionRequest from "../model/TransactionRequest";

const apiClient = new APIClient<TransactionRequest>("/transactions/new");

const useAddTransaction = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addTransaction } = useMutation({
    mutationKey: [queryKeys.transactions, mutationKeys.addTransaction],
    mutationFn: (transaction: TransactionRequest) =>
      apiClient.post(transaction, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newTransaction: TransactionRequest) => {
      toaster.create({
        title: `Transaction ${newTransaction.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      queryClient.invalidateQueries({
        queryKey: [queryKeys.accounts],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.categories],
      });
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.transactions],
      });
    },

    onError: (error, newTransaction) => {
      toaster.create({
        title: `There was an error adding the transaction ${newTransaction.Name}`,
        type: "error",
      });
    },
  });

  return addTransaction;
};

export default useAddTransaction;
