import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";

import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import Account from "../Account";

const apiClient = new APIClient<Account>("/accounts");

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteAccount } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.deleteAccount],
    mutationFn: (data: Account) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: Account, variables: Account) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      toaster.create({
        title: `You have deleted the ${data.Name} account`,
        type: "warning",
      });
    },
    onError: (error, newAccount) => {
      toaster.create({
        title: `There was an error deleting the account ${newAccount.Name}`,
        type: "error",
      });
    },
  });

  return deleteAccount;
}
