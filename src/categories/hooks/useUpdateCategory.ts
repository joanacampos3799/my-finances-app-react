import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import Category from "../model/Category";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";

const apiClient = new APIClient<Category>("/categories");

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateCategory } = useMutation({
    mutationKey: [queryKeys.categories, mutationKeys.updateCategory],
    mutationFn: (category: Category) =>
      apiClient.update(category.Id!!, category, userId!!, userToken!!),
    onSuccess: (data: Category) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      toaster.create({
        title: `You have updated the ${data.Name} category`,
        type: "success",
      });
    },
  });

  return updateCategory;
}
