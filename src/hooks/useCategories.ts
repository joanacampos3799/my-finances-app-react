import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../apiClient";
import Category from "../entities/Category";
import {queryKeys } from "../constants";
import { useLoginData } from "../contexts/AuthContext";

const apiClient = new APIClient<Category>('/categories');


const useCategories = () =>
  {
    const { userId, userToken } = useLoginData();
  
    const fallback: FetchResponse<Category> = {
      data: [],
      count: 0
    };
    const { data: categories = fallback } = useQuery({
      enabled: !!userToken,
      queryKey: [queryKeys.categories],
      queryFn: () => apiClient.getAll(userId!!, userToken!!),
    });
    return  categories
  }

export default useCategories;