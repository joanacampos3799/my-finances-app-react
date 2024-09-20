import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";

import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import BankList from "../models/BankList";

const apiClient = new APIClient<BankList>("/banks");

export function useDeleteBank() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteBank } = useMutation({
    mutationKey: [queryKeys.banks, mutationKeys.deleteBank],
    mutationFn: (data: BankList) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: BankList, variables: BankList) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.banks] });
      toaster.create({
        title: `You have deleted the ${data.Name} bank`,
        type: "warning",
      });
    },
    onError: (error, newBank) => {
      toaster.create({
        title: `There was an error deleting the bank ${newBank.Name}`,
        type: "error",
      });
    },
  });

  return deleteBank;
}
