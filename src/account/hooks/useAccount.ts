import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import Account from "../Model/Account";
import { queryClient } from "../..";

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
    initialData: () => {
      const initialData = queryClient
        .getQueryData<FetchResponse<Account>>([queryKeys.accounts])
        ?.data.find((d) => d.Id === id);
      return initialData;
    },
  });
  return { account, isLoading, error };
};

export default useAccount;
