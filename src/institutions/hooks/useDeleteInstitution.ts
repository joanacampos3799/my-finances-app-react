import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";

import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import InstitutionList from "../model/InstitutionList";

const apiClient = new APIClient<InstitutionList>("/institution");

export function useDeleteInstitution() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: deleteInsitution } = useMutation({
    mutationKey: [queryKeys.institutions, mutationKeys.deleteInstitution],
    mutationFn: (data: InstitutionList) =>
      apiClient.delete(data.Id!!, userId!!, userToken!!),
    onSuccess: (data: InstitutionList, variables: InstitutionList) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.institutions] });
      toaster.create({
        title: `You have deleted the ${data.Name} institution`,
        type: "warning",
      });
    },
    onError: (error, newInstitution) => {
      toaster.create({
        title: `There was an error deleting the institution ${newInstitution.Name}`,
        type: "error",
      });
    },
  });

  return deleteInsitution;
}
