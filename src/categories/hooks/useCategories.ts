import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";
import CategoryList from "../model/CategoryList";

const apiClient = new APIClient<CategoryList>("/categories");

const useCategories = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<CategoryList> = {
    data: [],
    count: 0,
  };
  const { data: categories = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.categories],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return categories;
};

export default useCategories;
