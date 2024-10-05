import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import AccountList from "../../accounts/models/AccountList";

const apiClient = new APIClient<AccountList>("/accounts");

const useAccount = (id: number) => {
  const { userId, userToken } = useLoginData();

  const fallback: AccountList = {
    Name: "Account",
    userId: userId!!,
    Id: 0,
    Balance: 0,
    InitialBalance: 0,
    Transactions: [],
    Debts: [],
    Type: 0,
  };
  const {
    data: account = fallback,
    isLoading,
    error,
  } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.accounts, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return { account, isLoading, error };
};

export default useAccount;
