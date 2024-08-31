import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import User from "../entities/User";

const apiClient = new APIClient<User>('/auth/token');

const useUser = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiClient.getAppUserId(userId),
    staleTime: 10 * 1000,
    retry: 3
  });


 

export default useUser;