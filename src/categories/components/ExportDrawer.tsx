import { Button, Flex } from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { LuFileSpreadsheet } from "react-icons/lu";
import ExportCategoriesButton from "./ExportCategoriesButton";
import { useEffect, useState } from "react";
import useDateFilter from "../../common/hooks/useDateFilter";
import DatePicker from "../../common/components/DatePicker";
import RadioMenu from "../../common/components/RadioMenu";
import { movementTypes } from "../../common/constants";
import usePeriodStore from "../../common/hooks/usePeriodStore";

const ExportDrawer = () => {
  const { period } = usePeriodStore();
  const { getStartEndDates } = useDateFilter();
  const { startDate: start, endDate: end } = getStartEndDates(period);

  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);

  const [type, setType] = useState<string>("-1");

  return (
    <DrawerRoot placement={"bottom"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild ms={"10px"} mb={"-20px"}>
        <Button colorPalette={"teal"}>
          <LuFileSpreadsheet />
        </Button>
      </DrawerTrigger>
      <DrawerContent roundedTop={"2xl"}>
        <DrawerHeader width={"full"}>
          <Flex direction={"row"} justifyContent={"space-between"}>
            <DrawerTitle color={"teal.700"}>Generate Report</DrawerTitle>
            <DrawerCloseTrigger boxSize={4} m={0} display={"inline-flex"} />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex direction={"row"} justifyContent={"space-between"} gap={2}>
            <DatePicker
              selectedDate={startDate}
              setSelectedDate={setStartDate}
              allowFutureDates={false}
            />
            <DatePicker
              selectedDate={endDate}
              setSelectedDate={setEndDate}
              allowFutureDates={false}
            />
            <RadioMenu
              width="30%"
              minW="10rem"
              data={[...movementTypes, { id: -1, name: "All" }]}
              selectedId={type}
              setSelectedId={setType}
              hasArrow
              variant={"outline"}
            />
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <ExportCategoriesButton
            period={period}
            startDate={startDate}
            endDate={endDate}
            type={+type}
          />
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default ExportDrawer;
