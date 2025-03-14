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
    count: 0,
  };
  const { data: transactions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.transactions],
    select: (response) => {
      const filteredData = select ? select(response.data) : response.data;
      return {
        data: filteredData,
        count: filteredData.length,
      };
    },
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return transactions;
};

export default useTransactions;
