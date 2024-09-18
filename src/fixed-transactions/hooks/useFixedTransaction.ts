import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import FixedTransaction from "../FixedTransaction";
import FixedTransactionDetails from "../FixedTransactionDetails";

const apiClient = new APIClient<FixedTransactionDetails>("/fixed-transactions");

const useFixedTransaction = (fixed: FixedTransaction) => {
  const { userId, userToken } = useLoginData();

  const fallback: FixedTransactionDetails = {
    Name: fixed.Name,
    Amount: fixed.Amount,
    PaymentDay: fixed.PaymentDay,
    Icon: fixed.Icon,
    categories: fixed.categories,
    Periodicity: fixed.Periodicity,
    userId: fixed.userId,
    transactionType: fixed.transactionType,
    TotalSpent: 0,
  };
  const { data: fixedTransactions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.fixedTransaction, fixed.Id],
    queryFn: () => apiClient.get(fixed.Id!!, userId!!, userToken!!),
  });
  return fixedTransactions;
};

export default useFixedTransaction;
