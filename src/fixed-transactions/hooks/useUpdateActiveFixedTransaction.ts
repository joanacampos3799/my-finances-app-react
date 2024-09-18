import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import FixedTransaction from "../FixedTransaction";

const apiClient = new APIClient<FixedTransaction>("/fixed-transactions/active");

export function useDeleteFixedTransaction() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteFixedTransaction } = useMutation({
    mutationKey: [
      queryKeys.fixedTransactions,
      mutationKeys.deleteFixedTransaction,
    ],
    mutationFn: (data: FixedTransaction) =>
      apiClient.setActive(data.Id!!, data.active, userId!!, userToken!!),
    onSuccess: (data: FixedTransaction, variables: FixedTransaction) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.fixedTransactions],
      });
      const str = data.active ? "restored" : "inactivated";
      toaster.create({
        title: `You have ${str} the ${data.Name} fixed transaction`,
        type: "warning",
      });
    },
    onError: (error, newFixed) => {
      console.log(error);
      toaster.create({
        title: `There was an error deleting the ${newFixed.Name} fixed transaction`,
        type: "error",
      });
    },
  });

  return deleteFixedTransaction;
}
