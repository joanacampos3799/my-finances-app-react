import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import Account from "../Model/Account";

const apiClient = new APIClient<Account>("/accounts");

const useAccount = (id: number) => {
  const { userId, userToken } = useLoginData();

  const {
    data: account,
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
