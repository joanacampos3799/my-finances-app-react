import RadioMenu from "./RadioMenu";
import { timePeriods } from "../constants";
import { useBreakpointValue } from "@chakra-ui/react";

interface Props {
  period: string;
  setPeriod: (period: string) => void;
}
const TimePeriodMenu = ({ period, setPeriod }: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <RadioMenu
      color
      width={isMobile ? "full" : "fit-content"}
      data={timePeriods}
      selectedId={"" + timePeriods.find((p) => p.name === period)?.id}
      setSelectedId={(p) => setPeriod(timePeriods[+p].name)}
      variant={"outline"}
      hasArrow
    />
  );
};

export default TimePeriodMenu;
