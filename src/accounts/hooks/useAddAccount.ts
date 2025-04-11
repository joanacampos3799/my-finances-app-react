import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import AccountRequest from "../models/AccountRequest";

const apiClient = new APIClient<AccountRequest>("/accounts/new");

const useAddAccount = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addAccount } = useMutation({
    mutationKey: [queryKeys.accounts, mutationKeys.addAccount],
    mutationFn: (account: AccountRequest) =>
      apiClient.post(account, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newAccount: AccountRequest) => {
      toaster.create({
        title: `Acccount ${newAccount.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      queryClient.invalidateQueries({ queryKey: [queryKeys.institutions] });

      return queryClient.invalidateQueries({
        queryKey: [queryKeys.accounts],
      });
    },

    onError: (error, newAccount) => {
      toaster.create({
        title: `There was an error adding the account ${newAccount.Name}`,
        type: "error",
      });
    },
  });

  return addAccount;
};

export default useAddAccount;
