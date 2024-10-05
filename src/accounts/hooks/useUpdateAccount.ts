import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import AccountRequest from "../models/AccountRequest";

const apiClient = new APIClient<AccountRequest>("/accounts");

export function useUpdateAccount(onUpdate: () => void) {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateAccount } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.updateAccount],
    mutationFn: (account: AccountRequest) =>
      apiClient.update(account.Id!!, account, userId!!, userToken!!),
    onMutate: () => onUpdate(),
    onSuccess: (data: AccountRequest, variables: AccountRequest) => {
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
