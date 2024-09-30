import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import Category from "../model/Category";

const apiClient = new APIClient<Category>("/categories");

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteCategory } = useMutation({
    mutationKey: [queryKeys.categories, mutationKeys.deleteCategory],
    mutationFn: (data: Category) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: Category, variables: Category) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      toaster.create({
        title: `You have deleted the ${data.Name} category`,
        type: "warning",
      });
    },
  });

  return deleteCategory;
}
