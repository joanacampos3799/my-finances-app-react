import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import User from "../User";
import { queryKeys } from "../../common/constants";

const apiClient = new APIClient<User>("/auth/token");

const useUser = (userId: string | undefined | null) => {
  const { data: userData } = useQuery({
    enabled: !!userId,
    queryKey: [queryKeys.user, userId],
    queryFn: () => apiClient.getAppUser(userId!!),
  });
  return userData;
};

export default useUser;
