import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../apiClient";
import Category from "../entities/Category";
import { CACHE_KEY_CATEGORIES } from "../constants";
import { AxiosRequestConfig } from "axios";

const apiClient = new APIClient<Category>('/categories');


const useCategories = (config?: AxiosRequestConfig) =>
  useQuery<FetchResponse<Category>, Error>({
    queryKey: CACHE_KEY_CATEGORIES,
    queryFn:async () => {
        const data = await apiClient.getAll(config)
        return data;
    },
    staleTime: 10 * 1000
  });

export default useCategories;