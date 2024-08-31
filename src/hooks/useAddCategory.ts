import { useMutation, useQueryClient } from "@tanstack/react-query";
import Category from "../entities/Category";
import APIClient from "../apiClient";
import { CACHE_KEY_CATEGORIES } from "../constants";

const apiClient = new APIClient<Category>('/categories/new');

interface AddCategoryContext { 
    previousCategories: Category[]
  }
  
  const useAddCategory = (onAdd: () => void) => {
    const queryClient = useQueryClient();
  
    return useMutation<Category, Error, Category, AddCategoryContext>({
      mutationFn: apiClient.post, 
      onMutate: (newCategory: Category) => {
        const previousCategories = queryClient.getQueryData<Category[]>(CACHE_KEY_CATEGORIES) || [];
  
        queryClient.setQueryData<Category[]>(CACHE_KEY_CATEGORIES, (categories = []) => [
          newCategory,
          ...categories,
        ]);
  
        onAdd();
  
        return { previousCategories };
      },
  
      onSuccess: (savedCategory, newCategory) => {
        queryClient.setQueryData<Category[]>(CACHE_KEY_CATEGORIES, (categories) =>
          categories?.map((category) =>
            category === newCategory ? savedCategory : category
          )
        );
      },
  
      onError: (error, newCategory, context) => {
        if (!context) return;
  
        queryClient.setQueryData<Category[]>(CACHE_KEY_CATEGORIES, context.previousCategories);
      }
    });
  }
  
  export default useAddCategory;