import { useMutation, useQueryClient } from "@tanstack/react-query";

import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import BankRequest from "../models/BankRequest";

const apiClient = new APIClient<BankRequest>("/banks/new");

const useAddBank = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addBank } = useMutation({
    mutationKey: [queryKeys.banks, mutationKeys.addBank],
    mutationFn: (bank: BankRequest) =>
      apiClient.post(bank, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newBank: BankRequest) => {
      toaster.create({
        title: `Bank ${newBank.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.banks],
      });
    },

    onError: (error, newBank) => {
      toaster.create({
        title: `There was an error adding the bank ${newBank.Name}`,
        type: "error",
      });
    },
  });

  return addBank;
};

export default useAddBank;
