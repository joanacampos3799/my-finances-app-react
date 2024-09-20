import React, { Fragment, useRef, useState, ReactNode } from "react";
import lodash_isEmpty from "lodash/isEmpty";
import lodash_isNil from "lodash/isNil";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import {
  DateObj,
  useDayzed,
  RenderProps,
  GetBackForwardPropsOptions,
  Calendar,
} from "dayzed";
import { format } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../../components/ui/popover";
import { InputGroup } from "../../components/ui/input-group";

const MONTH_NAMES_DEFAULT = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES_DEFAULT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DATE_FORMAT_DEFAULT = "dd-MM-yyyy";

interface SingleDatepickerBackButtonsProps {
  calendars: Calendar[];
  getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

interface SingleDatepickerForwardButtonsProps {
  calendars: Calendar[];
  getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

export interface SingleDatepickerProps {
  disabled: boolean;
  onDateChange: (date: Date) => void;
  id?: string;
  name?: string;
  date: Date;
  configs?: SingleDatepickerConfigs;
}

export interface SingleDatepickerConfigs {
  dateFormat: string;
  monthNames: string[];
  dayNames: string[];
}

const SingleDatepickerBackButtons = (
  props: SingleDatepickerBackButtonsProps
) => {
  const { calendars, getBackProps } = props;
  return (
    <Fragment>
      <Button
        {...getBackProps({
          calendars,
          offset: 12,
        })}
        variant="ghost"
        size="sm"
      >
        {"<<"}
      </Button>
      <Button {...getBackProps({ calendars })} variant="ghost" size="sm">
        {"<"}
      </Button>
    </Fragment>
  );
};

const SingleDatepickerForwardButtons = (
  props: SingleDatepickerForwardButtonsProps
) => {
  const { calendars, getForwardProps } = props;
  return (
    <Fragment>
      <Button {...getForwardProps({ calendars })} variant="ghost" size="sm">
        {">"}
      </Button>
      <Button
        {...getForwardProps({
          calendars,
          offset: 12,
        })}
        variant="ghost"
        size="sm"
      >
        {">>"}
      </Button>
    </Fragment>
  );
};

const SingleDatepickerCalendar = (
  props: RenderProps & { configs: SingleDatepickerConfigs }
) => {
  const { calendars, getDateProps, getBackProps, getForwardProps, configs } =
    props;

  if (lodash_isEmpty(calendars)) {
    return null;
  }

  return (
    <HStack className="datepicker-calendar">
      {calendars.map((calendar) => {
        return (
          <VStack divideX={"2px"} key={`${calendar.month}${calendar.year}`}>
            <HStack>
              <SingleDatepickerBackButtons
                calendars={calendars}
                getBackProps={getBackProps}
              />
              <Heading size="sm" textAlign="center">
                {configs.monthNames[calendar.month]} {calendar.year}
              </Heading>
              <SingleDatepickerForwardButtons
                calendars={calendars}
                getForwardProps={getForwardProps}
              />
            </HStack>

            <SimpleGrid columns={7} gap={2} textAlign="center">
              {configs.dayNames.map((day) => (
                <Box key={`${calendar.month}${calendar.year}${day}`}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {day}
                  </Text>
                </Box>
              ))}
              {calendar.weeks.map((week, weekIndex) => {
                return week.map((dateObj: DateObj, index) => {
                  const {
                    date,
                    today,
                    // prevMonth,
                    // nextMonth,
                    selected,
                  } = dateObj;
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;

                  return (
                    <Button
                      {...getDateProps({
                        dateObj,
                        // disabled: isDisabled
                      })}
                      key={key}
                      size="sm"
                      variant="outline"
                      borderColor={today ? "purple.400" : "transparent"}
                      bg={selected ? "purple.200" : undefined}
                    >
                      {date.getDate()}
                    </Button>
                  );
                });
              })}
            </SimpleGrid>
          </VStack>
        );
      })}
    </HStack>
  );
};

export const SingleDatepicker: React.FC<SingleDatepickerProps> = ({
  configs = {
    dateFormat: DATE_FORMAT_DEFAULT,
    monthNames: MONTH_NAMES_DEFAULT,
    dayNames: DAY_NAMES_DEFAULT,
  },
  ...props
}) => {
  const { date, name, disabled, onDateChange, id } = props;

  const ref = useRef<HTMLElement>(null);
  const initialFocusRef = useRef<HTMLInputElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const icon: ReactNode = (
    <Icon fontSize="sm">
      {" "}
      <LuCalendarDays />
    </Icon>
  );

  const onDateSelected = (options: { selectable: boolean; date: Date }) => {
    const { selectable, date } = options;
    if (!selectable) return;
    if (!lodash_isNil(date)) {
      onDateChange(date);
      setPopoverOpen(false);
      return;
    }
  };

  const dayzedData = useDayzed({
    showOutsideDays: false,
    onDateSelected,
    selected: date,
  });

  return (
    <PopoverRoot
      positioning={{ placement: "bottom-start" }}
      open={popoverOpen}
      onOpenChange={(e) => setPopoverOpen(e.open)}
      lazyMount
      unmountOnExit
    >
      <PopoverTrigger>
        <InputGroup endElement={icon} endElementProps={{ color: "gray.500" }}>
          <Input
            id={id}
            autoComplete="off"
            background="white"
            disabled={disabled}
            ref={initialFocusRef}
            onClick={() => setPopoverOpen(!popoverOpen)}
            name={name}
            value={format(date, configs.dateFormat)}
            onChange={(e) => e.target.value}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody
          padding={"10px 5px"}
          borderWidth={1}
          borderColor="blue.400"
        >
          <SingleDatepickerCalendar {...dayzedData} configs={configs} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};
