import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import Category from "../../categories/model/Category";

const apiClient = new APIClient<Category>("/categories");

const useCategory = (id: number) => {
  const { userId, userToken } = useLoginData();

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.categories, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return { category, isLoading, error };
};

export default useCategory;
