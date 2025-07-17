import { endOfWeek, parse, startOfWeek } from "date-fns";
import DateObj from "../date";

const useDateFilter = () => {
  const parseDate = (date: DateObj) => {
    return new Date(date.year, date.month - 1, date.day);
  };

  const getStartEndDates = (
    period: string,
    month: string,
    previous?: boolean
  ) => {
    const currentDate = new Date();

    switch (period.toLowerCase()) {
      case "weekly":
        return {
          startDate: startOfWeek(currentDate),
          endDate: endOfWeek(currentDate),
        };
      case "monthly":
        const monthSplit = month.split(" ");
        const parsedDate = parse(monthSplit[0], "MMMM", new Date());
        const monthNumber = parsedDate.getMonth();
        return {
          startDate: new Date(
            +monthSplit[1],
            previous ? monthNumber - 1 : monthNumber,
            1
          ),
          endDate: new Date(
            +monthSplit[1],
            previous ? monthNumber : monthNumber + 1,
            0
          ),
        };
      case "quarterly":
        const quarter = Math.floor((currentDate.getMonth() + 3) / 3);
        const startMonth = (previous ? quarter - 3 - 1 : quarter - 1) * 3;
        return {
          startDate: new Date(
            currentDate.getFullYear(),
            previous ? startMonth : startMonth,
            1
          ),
          endDate: new Date(currentDate.getFullYear(), startMonth + 3, 0),
        };
      case "half-yearly":
        const startMonthSemiAnnual = previous
          ? currentDate.getMonth() < 6
            ? 6
            : 0
          : currentDate.getMonth() < 6
            ? 0
            : 6;
        return {
          startDate: new Date(
            currentDate.getFullYear(),
            startMonthSemiAnnual,
            1
          ),
          endDate: new Date(
            currentDate.getFullYear(),
            startMonthSemiAnnual + 6,
            0
          ),
        };
      case "yearly":
        return {
          startDate: new Date(
            previous
              ? currentDate.getFullYear() - 1
              : currentDate.getFullYear(),
            0,
            1
          ),
          endDate: new Date(
            previous
              ? currentDate.getFullYear() - 1
              : currentDate.getFullYear(),
            11,
            31
          ),
        };

      default:
        return {
          startDate: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          ),
          endDate: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ),
        };
    }
  };

  return {
    parseDate,
    getStartEndDates,
  };
};

export default useDateFilter;
