import { useExportCategories } from "../hooks/useExportCategories";
import { Button } from "../../components/ui/button";
import { LuDownload } from "react-icons/lu";
import { useEffect, useState } from "react";
import { format } from "date-fns";
interface Props {
  period: string;
  startDate: Date;
  endDate: Date;
  type?: number;
}
const ExportCategoriesButton = ({ startDate, endDate, type }: Props) => {
  const { exportCategories, isPending } = useExportCategories();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);
  const handleExport = () => {
    console.log(startDate);
    exportCategories({
      startDate: format(startDate, "yyyy-MM-dd"), // Use selected or fallback
      endDate: format(endDate, "yyyy-MM-dd"),
      type: type === -1 ? undefined : type,
    });
  };

  return (
    <Button colorPalette="teal" onClick={handleExport} loading={loading}>
      Export <LuDownload />
    </Button>
  );
};

export default ExportCategoriesButton;
