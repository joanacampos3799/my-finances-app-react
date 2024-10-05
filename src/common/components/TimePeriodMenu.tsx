import React from "react";
import RadioMenu from "./RadioMenu";
import { timePeriods } from "../constants";

interface Props {
  period: string;
  setPeriod: (period: string) => void;
}
const TimePeriodMenu = ({ period, setPeriod }: Props) => {
  return (
    <RadioMenu
      color
      width="fit-content"
      data={timePeriods}
      selectedId={"" + timePeriods.find((p) => p.name === period)?.id}
      setSelectedId={(p) => setPeriod(timePeriods[+p].name)}
      hasArrow
    />
  );
};

export default TimePeriodMenu;
