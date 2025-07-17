import RadioMenu from "./RadioMenu";
import useMonths from "../hooks/useMonths";
import { useMemo } from "react";
import LoadingPage from "./LoadingPage";

interface Props {
  month: string;
  setMonth: (month: string) => void;
}
const MonthlyMenu = ({ month, setMonth }: Props) => {
  const { months, isLoading } = useMonths();
  const memoMonths = useMemo(() => months?.data, [months]);

  if (isLoading || !months) return <LoadingPage />;

  return (
    memoMonths && (
      <RadioMenu
        color
        width="fit-content"
        data={memoMonths}
        selectedId={"" + memoMonths.find((p) => p.name === month)?.id}
        setSelectedId={(p) => setMonth(memoMonths[+p].name)}
        variant={"outline"}
        hasArrow
      />
    )
  );
};

export default MonthlyMenu;
