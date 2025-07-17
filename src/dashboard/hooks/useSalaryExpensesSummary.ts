import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient from "../../common/apiClient";
import SalaryExpensesSummary from "../model/SalaryExpensesSummary";
import { queryKeys } from "../../common/constants";

const apiClient = new APIClient<SalaryExpensesSummary>(
  "/common/salary-expense-summary"
);

const useSalaryExpensesSummary = (startDate: string, endDate: string) => {
  const { userId, userToken } = useLoginData();

  const fallback: SalaryExpensesSummary = {
    salaryAmount: 0,
    totalExpenses: 0,
    remaining: 0,
  };
  const { data: summary = fallback, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.salaryExpensesSummay],
    queryFn: () =>
      apiClient.getQuery(
        userId!!,
        userToken!!,
        "?startDate=" + startDate + "&endDate=" + endDate
      ),
  });
  return { summary, isLoading };
};

export default useSalaryExpensesSummary;
