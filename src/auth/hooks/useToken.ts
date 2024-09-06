import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/constants";

export const useToken = () => {
  const { getToken } = useAuth();

  const { data: token } = useQuery<string | null, Error, string>({
    queryKey: [queryKeys.token],
    queryFn: async () => {
      const token = await getToken();
      return token;
    },
  });

  return token;
};
