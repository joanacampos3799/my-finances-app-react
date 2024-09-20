import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../../common/apiClient";
import Transaction from "../Transaction";
import { useLoginData } from "../../../auth/contexts/AuthContext";
import { queryKeys } from "../../../common/constants";

const apiClient = new APIClient<Transaction>("/transactions");

const useTransactions = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<Transaction> = {
    data: [],
    count: 0,
  };
  const { data: transactions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.transactions],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return transactions;
};

export default useTransactions;
