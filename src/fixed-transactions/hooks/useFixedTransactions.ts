import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FixedTransaction from "../FixedTransaction";

const apiClient = new APIClient<FixedTransaction>("/fixed-transactions");

const useFixedTransactions = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<FixedTransaction> = {
    data: [],
    count: 0,
  };
  const { data: fixedTransactions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.fixedTransactions],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return fixedTransactions;
};

export default useFixedTransactions;
