import { useMutation, useQueryClient } from "@tanstack/react-query";
import Category from "../entities/Category";
import APIClient from "../apiClient";
import { useLoginData } from "../contexts/AuthContext";
import { toast } from "../toast";
import { mutationKeys, queryKeys } from "../constants";

const apiClient = new APIClient<Category>('/categories/new');
  
  const useAddCategory = (onAdd: () => void) => {
    const queryClient = useQueryClient();
    const { userId, userToken } = useLoginData();

    const {mutate: addCategory} =useMutation({
      mutationKey: [mutationKeys.addCategory],
      mutationFn: (category : Category) => apiClient.post(category, userId!!, userToken!!), 
      onMutate: () => onAdd(),
  
      onSuccess: (newCategory: Category) => {
        toast({ title: `Category ${newCategory.Name} added!`, status: "success" });
      },
      onSettled: () => {
        // return promise to maintain 'inProgress' status until query invalidation
        //    is complete
        return queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      },
  
      onError: (error, newCategory) => {
        console.log(error.message)
        toast({ title: `There was an error adding Category ${newCategory.Name}`, status: "error" });
        }
    });

    return addCategory;
  }
  
  export default useAddCategory;