import RadioMenu from "./RadioMenu";
import useMonths from "../hooks/useMonths";
import { useMemo } from "react";
import LoadingPage from "./LoadingPage";
import { useBreakpointValue } from "@chakra-ui/react";

interface Props {
  month: string;
  setMonth: (month: string) => void;
}
const MonthlyMenu = ({ month, setMonth }: Props) => {
  const { months, isLoading } = useMonths();
  const memoMonths = useMemo(() => months?.data, [months]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isLoading || !months) return <LoadingPage />;

  return (
    memoMonths && (
      <RadioMenu
        color
        width={isMobile ? "full" : "fit-content"}
        data={memoMonths}
        selectedId={"" + memoMonths.find((p) => p.name === month)?.id}
        setSelectedId={(p) => {
          setMonth(memoMonths.find((x) => x.id === +p)!!.name);
        }}
        variant={"outline"}
        hasArrow
      />
    )
  );
};

export default MonthlyMenu;
