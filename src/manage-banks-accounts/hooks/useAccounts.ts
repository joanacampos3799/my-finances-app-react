import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import Account from "../Account";

const apiClient = new APIClient<Account>("/accounts");

const useAccounts = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<Account> = {
    data: [],
    count: 0,
  };
  const { data: accounts = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.accounts],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return accounts;
};

export default useAccounts;
