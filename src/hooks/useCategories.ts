import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../apiClient";
import User from "../entities/User";
import { useUserStore } from "../stores/userStore";
import Category from "../entities/Category";

const apiClient = new APIClient<Category>('/categories');


const useCategories = () =>
  useQuery<FetchResponse<Category>, Error>({
    queryKey: ['categories'],
    queryFn:async () => {
        const data = await apiClient.getAll()
        return data;
    },
  });

export default useCategories;