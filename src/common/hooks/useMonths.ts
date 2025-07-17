import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import monthOption from "../monthOption";

const apiClient = new APIClient<monthOption>("/common/months");

const useMonths = () => {
  const { userId, userToken } = useLoginData();

  const { data: months, isLoading } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.months],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return { months, isLoading };
};

export default useMonths;
