import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import Account from "../Account";

const apiClient = new APIClient<Account>("/accounts");

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateAccount } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.updateAccount],
    mutationFn: (account: Account) =>
      apiClient.update(account.Id!!, account, userId!!, userToken!!),
    onSuccess: (data: Account, variables: Account) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.accounts] });
      toaster.create({
        title: `You have updated the ${variables.Name} account`,
        type: "success",
      });
    },
    onError: (error, newAccount) => {
      toaster.create({
        title: `There was an error updating the account ${newAccount.Name}`,
        type: "error",
      });
    },
  });

  return updateAccount;
}
