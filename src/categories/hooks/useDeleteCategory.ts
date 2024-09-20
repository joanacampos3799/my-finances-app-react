import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import CategoryList from "../model/CategoryList";

const apiClient = new APIClient<CategoryList>("/categories");

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteCategory } = useMutation({
    mutationKey: [queryKeys.categories, mutationKeys.deleteCategory],
    mutationFn: (data: CategoryList) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: CategoryList, variables: CategoryList) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      toaster.create({
        title: `You have deleted the ${data.Name} category`,
        type: "warning",
      });
    },
  });

  return deleteCategory;
}
