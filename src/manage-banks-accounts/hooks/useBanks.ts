import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import BankList from "../models/BankList";

const apiClient = new APIClient<BankList>("/banks");

const useBanks = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<BankList> = {
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
