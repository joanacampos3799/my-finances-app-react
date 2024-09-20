import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import Account from "../models/Account";

const apiClient = new APIClient<Account>("/accounts");

const useAccount = (id: number) => {
  const { userId, userToken } = useLoginData();

  const fallback: Account = {
    Name: "Account",
    Types: [],

    userId: userId!!,
  };
  const { data: account = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.accounts, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return account;
};

export default useAccount;
