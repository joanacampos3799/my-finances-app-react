import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import MonthlyBudget from "../Model/MonthlyBudget";

const apiClient = new APIClient<MonthlyBudget>("/monthly-budget");

const useMonthlyBudget = (categoryId: number, month: string) => {
  const { userId, userToken } = useLoginData();

  const {
    data: budget,
    isLoading,
    error,
  } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.monthlyBudget, categoryId, month],
    queryFn: () =>
      apiClient.getQuery(
        userId!!,
        userToken!!,
        `?categoryId=${categoryId}&month=${month}`
      ),
  });
  return { budget, isLoading, error };
};

export default useMonthlyBudget;
