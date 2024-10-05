import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import InstitutionsRequest from "../model/InstitutionRequest";

const apiClient = new APIClient<InstitutionsRequest>("/institutions");

export function useUpdateInstitution() {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { mutate: updateInstitution } = useMutation({
    mutationKey: [queryKeys.institutions, mutationKeys.updateInstitution],
    mutationFn: (institution: InstitutionsRequest) =>
      apiClient.update(institution.Id!!, institution, userId!!, userToken!!),
    onSuccess: (data: InstitutionsRequest, variables: InstitutionsRequest) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.institutions] });
      toaster.create({
        title: `You have updated the ${variables.Name} institution`,
        type: "success",
      });
    },
    onError: (error, newInsitution) => {
      toaster.create({
        title: `There was an error updating the institution ${newInsitution.Name}`,
        type: "error",
      });
    },
  });

  return updateInstitution;
}
