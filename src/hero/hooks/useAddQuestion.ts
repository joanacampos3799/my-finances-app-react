import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../common/apiClient";
import { mutationKeys, queryKeys } from "../../common/constants";

interface QuestionRequest {
  question: string;
}
const apiClient = new APIClient<QuestionRequest>("/question");

const useAddQuestion = () => {
  const queryClient = useQueryClient();

  const { mutate: sendQuestion } = useMutation({
    mutationKey: [queryKeys.question, mutationKeys.addQuestion],
    mutationFn: (question: QuestionRequest) => apiClient.postQuestion(question),

    onSettled: () => {
      // return promise to maintain 'inProgress' status until query invalidation
      //    is complete
      return queryClient.invalidateQueries({
        queryKey: [queryKeys.question],
      });
    },
  });

  return sendQuestion;
};

export default useAddQuestion;
