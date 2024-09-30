import Transaction from "../../transactions/model/Transaction";
import useDateFilter from "./useDateFilter";

const useAmount = () => {
  const { parseDate, getStartEndDates } = useDateFilter();
  const getTransactionsTotalAmount = (
    transactions: Transaction[],
    period: string,
    type?: number
  ) => {
    const dates = getStartEndDates(period);
    // Filter by transaction type if necessary
    if (type && type !== 2) {
      transactions = transactions.filter((f) => f.transactionType === type);
    }

    if (
      !dates ||
      !dates.startDate ||
      !dates.endDate ||
      transactions.length == 0
    ) {
      return 0; // Return 0 if the date range is invalid or undefined
    }

    transactions.filter((f) => {
      const itemDate = parseDate(f.Date);
      return itemDate >= dates.startDate && itemDate <= dates.endDate;
    });
    // Filter transactions by date range and calculate total amount
    return transactions
      .filter((f) => {
        const itemDate = parseDate(f.Date);
        return itemDate >= dates.startDate && itemDate <= dates.endDate;
      })
      .map((x) => x.Amount)
      .reduce((acc, val) => acc + val, 0); // Sum up the amounts
  };

  const getPercentage = (current: number, total: number) => {
    return (current / total) * 100;
  };

  return {
    getTransactionsTotalAmount,
    getPercentage,
  };
};

export default useAmount;
