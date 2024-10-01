import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys, queryKeys } from "../../common/constants";
import APIClient from "../../common/apiClient";
import { useLoginData } from "../../auth/contexts/AuthContext";
import { toaster } from "../../components/ui/toaster";
import { AxiosResponse } from "axios";

const apiClient = new APIClient<Blob>("/categories/export");

export function useExportCategories() {
  const { userId, userToken } = useLoginData();

  const { mutate: exportCategories, isPending } = useMutation({
    mutationKey: [queryKeys.categories, mutationKeys.exportCategories],
    mutationFn: ({
      startDate,
      endDate,
      type,
    }: {
      startDate: string;
      endDate: string;
      type?: number;
    }) => apiClient.export({ startDate, endDate, type }, userId!!, userToken!!),

    onSuccess: (response: AxiosResponse<Blob>) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "categories_report.xlsx");

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link from the DOM
      link.remove();
      toaster.create({
        title: "Export Successful",
        type: "success",
      });
    },
    onError: () => {
      toaster.create({
        title: "Error occurred during export.",
        type: "error",
      });
    },
  });

  return { exportCategories, isPending };
}
