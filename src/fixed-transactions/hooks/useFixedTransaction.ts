import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FixedTransactionDetails from "../model/FixedTransactionDetails";

const apiClient = new APIClient<FixedTransactionDetails>("/fixed-transactions");

const useFixedTransaction = (id: number) => {
  const { userId, userToken } = useLoginData();

  const { data: fixedTransaction, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.fixedTransaction, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return { fixedTransaction, isLoading };
};

export default useFixedTransaction;
