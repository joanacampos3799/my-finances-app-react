import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import FixedTransaction from "../model/FixedTransaction";

const apiClient = new APIClient<FixedTransaction>("/fixed-transactions/new");

const useAddFixedTransaction = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addFixedTransaction } = useMutation({
    mutationKey: [
      queryKeys.fixedTransactions,
      mutationKeys.addFixedTransaction,
    ],
    mutationFn: (fixed: FixedTransaction) =>
      apiClient.post(fixed, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newFixed: FixedTransaction) => {
      toaster.create({
        title: `Fixed Transaction ${newFixed.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.fixedTransactions],
      });
    },

    onError: (error, newFixed) => {
      console.log(error.message);
      toaster.create({
        title: `There was an error adding Fixed transaction ${newFixed.Name}`,
        type: "error",
      });
    },
  });

  return addFixedTransaction;
};

export default useAddFixedTransaction;
