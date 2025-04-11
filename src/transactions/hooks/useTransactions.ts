import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../common/apiClient";
import Transaction from "../model/Transaction";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { queryKeys } from "../../common/constants";

const apiClient = new APIClient<Transaction>("/transactions");

const useTransactions = (select?: (data: Transaction[]) => Transaction[]) => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<Transaction> = {
    data: [],
    isValueSet: false,
    count: 0,
  };
  const { data: transactions = fallback, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.transactions],
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
  return { transactions, isLoading };
};

export default useTransactions;
