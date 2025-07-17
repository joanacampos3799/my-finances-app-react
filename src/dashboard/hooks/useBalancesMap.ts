import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient from "../../common/apiClient";
import balanceMap from "../model/balanceMap";
import { queryKeys } from "../../common/constants";

const apiClient = new APIClient<balanceMap>("/daily-balances/merged-balances");

const useBalancesMap = (startDate: string, endDate: string) => {
  const { userId, userToken } = useLoginData();

  const { data: balances, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.balancesMap],
    queryFn: () =>
      apiClient.getBalances(userId!!, userToken!!, startDate, endDate),
  });
  return { balances, isLoading };
};

export default useBalancesMap;
