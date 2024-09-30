import { useMutation, useQueryClient } from "@tanstack/react-query";

import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import Category from "../model/Category";

const apiClient = new APIClient<Category>("/categories/new");

const useAddCategory = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addCategory } = useMutation({
    mutationKey: [queryKeys.categories, mutationKeys.addCategory],
    mutationFn: (category: Category) =>
      apiClient.post(category, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newCategory: Category) => {
      toaster.create({
        title: `Category ${newCategory.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.categories],
      });
    },

    onError: (error, newCategory) => {
      console.log(error.message);
      toaster.create({
        title: `There was an error adding Category ${newCategory.Name}`,
        type: "error",
      });
    },
  });

  return addCategory;
};

export default useAddCategory;
