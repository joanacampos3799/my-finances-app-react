import { useQuery } from "@tanstack/react-query";
import { useLoginData } from "../../auth/contexts/AuthContext";
import APIClient, { FetchResponse } from "../../common/apiClient";
import { queryKeys } from "../../common/constants";
import InstitutionList from "../model/InstitutionList";

const apiClient = new APIClient<InstitutionList>("/institutions");

const useInstitutions = () => {
  const { userId, userToken } = useLoginData();

  const fallback: FetchResponse<InstitutionList> = {
    data: [],
    count: 0,
  };
  const { data: institutions = fallback } = useQuery({
    enabled: !!userToken,
    queryKey: [queryKeys.institutions],
    queryFn: () => apiClient.getAll(userId!!, userToken!!),
  });
  return institutions;
};

export default useInstitutions;
