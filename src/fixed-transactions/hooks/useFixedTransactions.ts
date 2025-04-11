import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FixedTransactionList from "../model/FixedTransactionsList";

const apiClient = new APIClient<FixedTransactionList>("/fixed-transactions");

const useFixedTransactions = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<FixedTransactionList> = {
    data: [],
    isValueSet: false,
    count: 0,
  };
  const { data: fixedTransactions = fallback, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.fixedTransactions],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return { fixedTransactions, isLoading };
};

export default useFixedTransactions;
