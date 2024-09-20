import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FixedTransactionDetails from "../model/FixedTransactionDetails";

const apiClient = new APIClient<FixedTransactionDetails>("/fixed-transactions");

const useFixedTransaction = (id: number) => {
  const { userId, userToken } = useLoginData();

  const fallback: FixedTransactionDetails = {
    Name: "Fixed Transaction",
    Amount: 0,
    PaymentDay: 1,
    Icon: "FaMoney",
    categories: [],
    Periodicity: 1,
    userId: userId!!,
    transactionType: 1,
    TotalSpent: 0,
  };
  const { data: fixedTransactions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.fixedTransaction, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return fixedTransactions;
};

export default useFixedTransaction;
