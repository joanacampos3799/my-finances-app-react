import { useQuery } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import { useLoginData } from "../../auth/contexts/AuthContext";

import Category from "../model/Category";

const apiClient = new APIClient<Category>("/categories");

const useCategory = (id: number) => {
  const { userId, userToken } = useLoginData();

  const fallback: Category = {
    Name: "Category",
    Icon: "FaPen",
    userId: userId!!,
    CategoryType: 1,
  };
  const { data: categories = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.categories, id],
    queryFn: () => apiClient.get(id, userId!!, userToken!!),
  });
  return categories;
};

export default useCategory;
