import { useQuery } from "@tanstack/react-query";
import { Bank } from "../Bank";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";

const apiClient = new APIClient<Bank>("/banks");

const useBanks = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<Bank> = {
    data: [],
    count: 0,
  };
  const { data: banks = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.banks],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return banks;
};

export default useBanks;
