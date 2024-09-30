import { useState } from "react";
import useAmount from "./useAmount";
import Transaction from "../../transactions/model/Transaction";

const useSorting = () => {
  const { getTransactionsTotalAmount } = useAmount();
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

  const sortString = <T>(
    array: T[],
    property: keyof T,
    header: string,
    id: keyof T
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
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

  const SortTotal = <T, V>(
    array: T[],
    subArray: keyof T,
    type: keyof T,
    period: string,
    header: string,
    id: keyof T
  ) => {
    const state = getNextState(header);
    setSorting({ column: header, state: state });
    if (state !== null) {
      return array.sort((a, b) => {
        const totalA = getTransactionsTotalAmount(
          a[subArray] as Transaction[],
          period,
          a[type] as number
        );
        const totalB = getTransactionsTotalAmount(
          b[subArray] as Transaction[],
          period,
          b[type] as number
        );
        return state === "asc" ? totalA - totalB : totalB - totalA;
      });
    } else
      return array.sort(
        (a, b) => (a[id] as unknown as number) - (b[id] as unknown as number)
      );
  };
  return {
    SortTotal,
    isSorting,
    getSortingState,
    sortNumber,
    sortString,
  };
};

export default useSorting;
