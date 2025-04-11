import { useState } from "react";
import useInsights from "./useInsights";
import Transaction from "../../transactions/model/Transaction";
import DateObj from "../date";
import useDateFilter from "./useDateFilter";

const useSorting = () => {
  const { getTransactionsTotalAmount } = useInsights();
  const { parseDate } = useDateFilter();
  const [sorting, setSorting] = useState<{
    state: "asc" | "desc" | null;
    column: string | null;
  }>({
    state: null,
    column: null,
  });
  const getNextState = (column: string) => {
    if (sorting.column !== column) return "asc";
    return sorting.state === "asc"
      ? "desc"
      : sorting.state === "desc"
        ? null
        : "asc";
  };

  const isSorting = (column: string) =>
    sorting.column === column && sorting.state !== null;

  const getSortingState = () => sorting.state;

  const sortNumber = <T>(
    array: T[],
    property: keyof T,
    header: string,
    id: keyof T
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    return state === "asc"
      ? array.sort(
          (a, b) =>
            (a[property] as unknown as number) -
            (b[property] as unknown as number)
        )
      : state === "desc"
        ? array.sort(
            (a, b) =>
              (b[property] as unknown as number) -
              (a[property] as unknown as number)
          )
        : array.sort(
            (a, b) =>
              (a[id] as unknown as number) - (b[id] as unknown as number)
          );
  };

  const sortString = <T, V>(
    array: T[],
    property: keyof T,
    header: string,
    id: keyof T,
    subProperty?: keyof V
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
        if (subProperty) {
          const aValue = (a[property] as V)[subProperty] as unknown as string;
          const bValue = (b[property] as V)[subProperty] as unknown as string;

          return state === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        const aValue = a[property] as unknown as string;
        const bValue = b[property] as unknown as string;

        return state === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    } else
      return array.sort(
        (a, b) => (a[id] as unknown as number) - (b[id] as unknown as number)
      );
  };

  const sortDate = <T, V>(
    array: T[],
    property: keyof T,
    header: string,
    id: keyof T,
    subProperty?: keyof V
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
        if (subProperty) {
          const dateA = parseDate(
            (a[property] as V)[subProperty] as unknown as DateObj
          );
          const dateB = parseDate(
            (b[property] as V)[subProperty] as unknown as DateObj
          );

          return state === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }
        const dateA = parseDate(a[property] as unknown as DateObj);
        const dateB = parseDate(b[property] as unknown as DateObj);

        return state === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else
      return array.sort(
        (a, b) => (a[id] as unknown as number) - (b[id] as unknown as number)
      );
  };

  const SortTotal = <T>(
    array: T[],
    subArray: keyof T,
    type: keyof T,
    period: string,
    header: string,
    id: keyof T,
    filterType?: number
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
        const totalA = getTransactionsTotalAmount(
          a[subArray] as Transaction[],
          period,
          filterType ? filterType : (a[type] as number)
        );
        const totalB = getTransactionsTotalAmount(
          b[subArray] as Transaction[],
          period,
          filterType ? filterType : (b[type] as number)
        );
        return state === "asc" ? totalA - totalB : totalB - totalA;
      });
    } else
      return array.sort(
        (a, b) => (a[id] as unknown as number) - (b[id] as unknown as number)
      );
  };

  const SortSum = <T>(
    array: T[],
    subArray: keyof T,
    header: string,
    id: keyof T
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
        const sumA = (a[subArray] as Transaction[]).length;

        const sumB = (b[subArray] as Transaction[]).length;
        return state === "asc" ? sumA - sumB : sumB - sumA;
      });
    } else
      return array.sort(
        (a, b) => (a[id] as unknown as number) - (b[id] as unknown as number)
      );
  };
  return {
    SortTotal,
    SortSum,
    isSorting,
    getSortingState,
    sortNumber,
    sortDate,
    sortString,
  };
};

export default useSorting;
