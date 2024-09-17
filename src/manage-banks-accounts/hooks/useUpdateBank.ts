import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import { Bank } from "../Bank";

const apiClient = new APIClient<Bank>("/banks");

export function useUpdateBank() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateBank } = useMutation({
    mutationKey: [queryKeys.banks, mutationKeys.updateBank],
    mutationFn: (bank: Bank) =>
      apiClient.update(bank.Id!!, bank, userId!!, userToken!!),
    onSuccess: (data: Bank, variables: Bank) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.banks] });
      toaster.create({
        title: `You have updated the ${variables.Name} bank`,
        type: "success",
      });
    },
    onError: (error, newBank) => {
      toaster.create({
        title: `There was an error updating the bank ${newBank.Name}`,
        type: "error",
      });
    },
  });

  return updateBank;
}
