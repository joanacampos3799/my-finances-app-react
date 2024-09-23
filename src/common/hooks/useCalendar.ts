import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  getDaysInMonth,
} from "date-fns";

interface Type {
  id: number;
  name: string;
}
const useCalendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getYears = (): Type[] => {
    const currentYear = new Date().getFullYear();

    return Array.from(
      { length: (currentYear - 10 - currentYear) / -1 + 1 },
      (_, i) => ({
        id: currentYear + i * -1,
        name: "" + (currentYear + i * -1),
      })
    );
  };

  const getMonths = (): Type[] => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      name: format(new Date().setMonth(i), "LLLL"),
    }));
  };

  const daysInMonth = (year: number, month: number) => {
    const first = new Date(year, month, 1);
    const last = endOfMonth(first);
    const daysOfWeekFirst = getDay(first);
    const daysOfWeekLast = getDay(last);
    return eachDayOfInterval({
      start:
        daysOfWeekFirst === 0
          ? first
          : new Date(year, month - 1, getDaysInMonth(last) - daysOfWeekFirst),
      end:
        daysOfWeekLast === 6
          ? last
          : new Date(year, month + 1, 6 - daysOfWeekLast),
    }).map((day) => ({
      value: getDate(day),
      date: day,
      disabled: day.getMonth() !== month,
    }));
  };
  return {
    getYears,
    getMonths,
    daysInMonth,
    daysOfWeek,
  };
};

export default useCalendar;
