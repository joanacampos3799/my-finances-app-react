import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import AccountList from "../models/AccountList";

const apiClient = new APIClient<AccountList>("/accounts");

const useAccounts = (select?: (data: AccountList[]) => AccountList[]) => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<AccountList> = {
    data: [],
    isValueSet: false,
    count: 0,
  };
  const { data: accounts = fallback, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.accounts],
    select: (response) => {
      const filteredData = select ? select(response.data) : response.data;
      return {
        data: filteredData,
        isValueSet: true,
        count: filteredData.length,
      };
    },
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return { accounts, isLoading };
};

export default useAccounts;
