import { isAfter } from "date-fns";
import Transaction from "../../transactions/model/Transaction";
import useDateFilter from "./useDateFilter";
import AccountList from "../../accounts/models/AccountList";
import { accountTypes } from "../constants";

const useInsights = () => {
  const { parseDate, getStartEndDates } = useDateFilter();

  const getTransactionsTotal = (
    transactions: Transaction[],
    period: string,
    type?: number,
    previous?: boolean
  ) => {
    const dates = getStartEndDates(period, previous);
    // Filter by transaction type if necessary
    if (type !== undefined && type !== 2) {
      transactions = transactions.filter((f) => f.transactionType === type);
    }

    if (
      !dates ||
      !dates.startDate ||
      !dates.endDate ||
      transactions.length === 0
    ) {
      return 0; // Return 0 if the date range is invalid or undefined
    }

    // Filter transactions by date range and calculate total amount
    return transactions.filter((f) => {
      const itemDate = parseDate(f.Date);
      return itemDate >= dates.startDate && itemDate <= dates.endDate;
    }).length;
  };
  const getTransactionsTotalAmount = (
    transactions: Transaction[],
    period?: string,
    type?: number,
    previous?: boolean
  ) => {
    if (period === undefined) {
      if (type !== undefined && type !== 2) {
        transactions = transactions.filter((f) => f.transactionType === type);
      }

      return transactions
        .map((x) => x.Amount)
        .reduce((acc, val) => acc + val, 0);
    } else {
      const dates = getStartEndDates(period, previous);
      // Filter by transaction type if necessary
      if (type !== undefined && type !== 2) {
        transactions = transactions.filter((f) => f.transactionType === type);
      }

      if (
        !dates ||
        !dates.startDate ||
        !dates.endDate ||
        transactions.length === 0
      ) {
        return 0; // Return 0 if the date range is invalid or undefined
      }

      // Filter transactions by date range and calculate total amount
      return transactions
        .filter((f) => {
          const itemDate = parseDate(f.Date);
          return itemDate >= dates.startDate && itemDate <= dates.endDate;
        })
        .map((x) => x.Amount)
        .reduce((acc, val) => acc + val, 0); // Sum up the amounts
    }
  };
  const findMostRecentTransaction = (transactions: Transaction[]) => {
    if (transactions.length === 0) {
      return "N/A"; // No transactions available
    }

    return parseDate(
      transactions.reduce((mostRecent, current) => {
        const currentDate = parseDate(current.Date);
        const mostRecentDate = parseDate(mostRecent.Date);

        return isAfter(currentDate, mostRecentDate) ? current : mostRecent;
      }).Date
    ).toDateString();
  };
  const getTransactionsAverageAmount = (transactions: Transaction[]) => {
    if (transactions.length === 0) {
      return 0; // Return 0 if there are no transactions
    }

    // Calculate the total amount
    const totalAmount = transactions.reduce((sum, transaction) => {
      return sum + transaction.Amount;
    }, 0);

    // Calculate the average
    const average = totalAmount / transactions.length;

    // Return the average rounded to two decimal places
    return Math.round(average * 100) / 100;
  };
  const getPercentage = (current: number, total: number) => {
    return parseFloat(((current / total) * 100).toFixed(2));
  };

  function budgetInsight(totalSpending: number, budget: number) {
    if (totalSpending > budget) {
      const overPercentage = ((totalSpending - budget) / budget) * 100;
      return `You are over budget by €${(totalSpending - budget).toFixed(2)}, which is ${overPercentage.toFixed(2)}% more than your budget.`;
    } else {
      const remainingPercentage = ((budget - totalSpending) / budget) * 100;
      return `You are within your budget. You have €${(budget - totalSpending).toFixed(2)} remaining, which is ${remainingPercentage.toFixed(2)}% of your budget.`;
    }
  }

  /**
   * Generates spending trend insights.
   * @param {Array} currentTransactions - Current period transactions.
   * @param {Array} previousTransactions - Previous period transactions.
   * @returns {string} - Insight about spending trend.
   */
  function spendingTrendInsight(
    currentTransactions: Transaction[],
    period: string
  ) {
    const currentTotal = getTransactionsTotalAmount(
      currentTransactions,
      period
    );
    const previousTotal = getTransactionsTotalAmount(
      currentTransactions,
      period,
      undefined,
      true
    );

    if (previousTotal === 0) return "No previous data to compare.";

    const change = ((currentTotal - previousTotal) / previousTotal) * 100;

    if (change > 0) {
      return `Spending has increased by ${change.toFixed(2)}% compared to last ${period.slice(0, -2)}.`;
    } else if (change < 0) {
      return `Spending has decreased by ${Math.abs(change).toFixed(2)}% compared to last ${period.slice(0, -2)}.`;
    } else {
      return `Spending is the same as last ${period.slice(0, -2)}.`;
    }
  }

  const calculateAccountTypeBalances = (accounts: AccountList[]) => {
    const typeBalances: Record<string, number> = {};

    accounts.forEach((account) => {
      // Initialize balance if not present
      const typeName = accountTypes[account.Type].name;
      if (!typeBalances[typeName]) {
        typeBalances[typeName] = 0;
      }
      typeBalances[typeName] += account.Balance;
    });

    return typeBalances;
  };

  return {
    calculateAccountTypeBalances,
    getTransactionsAverageAmount,
    getTransactionsTotalAmount,
    findMostRecentTransaction,
    getTransactionsTotal,
    getPercentage,
    budgetInsight,
    spendingTrendInsight,
  };
};

export default useInsights;
