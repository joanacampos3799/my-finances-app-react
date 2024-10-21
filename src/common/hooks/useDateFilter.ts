import { endOfWeek, startOfWeek } from "date-fns";

const useDateFilter = () => {
  const parseDate = (date: string) => {
    const splitDate = date.split("/");
    return new Date(+splitDate[2], +splitDate[1] - 1, +splitDate[0]);
  };

  const getStartEndDates = (period: string, previous?: boolean) => {
    const currentDate = new Date();

    switch (period.toLowerCase()) {
      case "weekly":
        return {
          startDate: startOfWeek(currentDate),
          endDate: endOfWeek(currentDate),
        };
      case "monthly":
        return {
          startDate: new Date(
            currentDate.getFullYear(),
            previous ? currentDate.getMonth() - 1 : currentDate.getMonth(),
            1
          ),
          endDate: new Date(
            currentDate.getFullYear(),
            previous ? currentDate.getMonth() : currentDate.getMonth() + 1,
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
