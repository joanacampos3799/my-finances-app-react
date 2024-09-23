import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";
import { InputGroup } from "../../components/ui/input-group";
import { LuCalendar, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import useCalendar from "../hooks/useCalendar";
import {
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  isThisMonth,
  subMonths,
  subYears,
} from "date-fns";
import RadioMenu from "./RadioMenu";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}
const DatePicker = ({ selectedDate, setSelectedDate }: Props) => {
  const [open, setOpen] = useState(false);
  const { daysOfWeek, daysInMonth, getMonths, getYears } = useCalendar();

  const currentDate = new Date();
  const [month, setMonth] = useState("" + selectedDate.getMonth());
  const [year, setYear] = useState("" + selectedDate.getFullYear());
  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: "bottom" }}
    >
      <PopoverTrigger width={"full"}>
        <InputGroup
          width="full"
          endElement={<LuCalendar />}
          endElementProps={{ color: "gray.500" }}
        >
          <Input
            width="full"
            value={format(selectedDate, "dd/MM/yyyy")}
            onChange={(e) => e.target.value}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent portalled={false}>
        <PopoverArrow />
        <PopoverHeader>
          <HStack justifyContent={"space-between"}>
            <Button
              variant={"plain"}
              size={"sm"}
              disabled={isSameMonth(selectedDate, subYears(currentDate, 10))}
              onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
            >
              <LuChevronLeft />
            </Button>
            <HStack>
              <RadioMenu
                width="fit-content"
                variant={"plain"}
                data={getMonths()}
                selectedId={month}
                setSelectedId={setMonth}
                hasArrow={false}
              />

              <RadioMenu
                width="fit-content"
                variant={"plain"}
                data={getYears()}
                selectedId={year}
                setSelectedId={setYear}
                hasArrow={false}
              />
            </HStack>
            <Button
              size={"sm"}
              variant={"plain"}
              disabled={isThisMonth(selectedDate)}
              onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
            >
              <LuChevronRight />
            </Button>
          </HStack>
        </PopoverHeader>

        <PopoverBody>
          <SimpleGrid columns={7} gap={1}>
            {daysOfWeek.map((day) => (
              <Center key={day}>{day}</Center>
            ))}
            {daysInMonth(
              selectedDate.getFullYear(),
              selectedDate.getMonth()
            ).map((day) => (
              <Button
                size={"sm"}
                key={`${day.value} - ${day.disabled}`}
                onClick={() => setSelectedDate(day.date)}
                variant={isSameDay(selectedDate, day.date) ? "solid" : "ghost"}
                disabled={day.disabled}
              >
                {day.value}
              </Button>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default DatePicker;
