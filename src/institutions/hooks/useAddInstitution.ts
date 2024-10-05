import { useMutation, useQueryClient } from "@tanstack/react-query";

import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { mutationKeys, queryKeys } from "../../common/constants";
import { toaster } from "../../components/ui/toaster";
import InstitutionsRequest from "../model/InstitutionRequest";

const apiClient = new APIClient<InstitutionsRequest>("/institutions/new");

const useAddInstitution = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { mutate: addInstitution } = useMutation({
    mutationKey: [queryKeys.institutions, mutationKeys.addInstitution],
    mutationFn: (institution: InstitutionsRequest) =>
      apiClient.post(institution, userId!!, userToken!!),
    onMutate: () => onAdd(),

    onSuccess: (newInstitution: InstitutionsRequest) => {
      toaster.create({
        title: `Institution ${newInstitution.Name} added!`,
        type: "success",
      });
    },
    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.institutions],
      });
    },

    onError: (error, newInstitution) => {
      toaster.create({
        title: `There was an error adding the institution ${newInstitution.Name}`,
        type: "error",
      });
    },
  });

  return addInstitution;
};

export default useAddInstitution;
