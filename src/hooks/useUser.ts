import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import User from "../entities/User";

const apiClient = new APIClient<User>('/token');

const useUser = (token: string) =>
  useQuery({
    queryKey: ['user', token],
    queryFn: () => apiClient.get(token),
  });

export default useUser;