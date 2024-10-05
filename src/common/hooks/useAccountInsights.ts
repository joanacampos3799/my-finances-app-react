import {
  eachDayOfInterval,
  format,
  formatDate,
  getDate,
  getDaysInMonth,
  interval,
} from "date-fns";
import AccountList from "../../accounts/models/AccountList";
import { accountTypes } from "../constants";
import useDateFilter from "./useDateFilter";
import Transaction from "../../transactions/model/Transaction";

const useAccountInsights = () => {
  const { parseDate, getStartEndDates } = useDateFilter();
  // Helper functions to determine if the account type is an asset or debt
  const isAsset = (type: number): boolean => {
    // Define the asset types
    const assetTypes = [
      "Savings",
      "Debit",
      "Investment, ",
      "Food",
      "MultiCurrency",
      "Gift Card",
      "Cash",
    ];
    return assetTypes.includes(accountTypes[type].name);
  };

  const isDebt = (type: number): boolean => {
    // Define the debt types
    const debtTypes = ["Credit", "Loan"];
    return debtTypes.includes(accountTypes[type].name);
  };

  const calculateAssetsAndDebts = (
    accounts: AccountList[],
    period?: string,
    previous?: boolean
  ) => {
    let totalAssets = 0;
    let totalDebts = 0;

    if (period === undefined)
      accounts.forEach((account) => {
        if (isAsset(account.Type)) {
          totalAssets += account.Balance;
        }

        if (isDebt(account.Type)) {
          totalDebts += account.Balance;
        }

        // Add up debts for this account
        totalDebts += account.Debts
          ? account.Debts.reduce((sum, debt) => sum + debt.Balance, 0)
          : 0;
      });
    else {
      const dates = getStartEndDates(period, previous);
      if (!dates || !dates.startDate || !dates.endDate) {
        totalAssets = 0;
        totalDebts = 0;
      }

      accounts.forEach((account) => {
        account.Transactions.filter((f) => {
          const itemDate = parseDate(f.Date);
          return itemDate >= dates.startDate && itemDate <= dates.endDate;
        }).forEach((transaction) => {
          if (isAsset(account.Type)) {
            totalAssets += transaction.Amount;
          } else {
            totalDebts += Math.abs(transaction.Amount);
          }
        });

        totalDebts += account.Debts
          ? account.Debts.reduce((sum, debt) => sum + debt.Balance, 0)
          : 0;
      });
    }

    return { totalAssets, totalDebts };
  };
  const calculateNetWorthChange = (accounts: AccountList[], period: string) => {
    const { totalAssets: currentAssets, totalDebts: currentDebts } =
      calculateAssetsAndDebts(accounts, period);
    const netWorth = currentAssets - currentDebts;
    const { totalAssets: previousAssets, totalDebts: previousDebts } =
      calculateAssetsAndDebts(accounts, period, true);

    const previousNetWorth = previousAssets - previousDebts;
    if (previousNetWorth === 0) return "No previous data to compare.";

    const change = netWorth - previousNetWorth;

    if (change > 0) {
      return `Net worth increased by €${change.toFixed(2)} compared to last period.`;
    } else if (change < 0) {
      return `Net worth decreased by €${Math.abs(change).toFixed(2)}.`;
    } else {
      return "Net worth remains unchanged.";
    }
  };

  function spendingTrend(accounts: AccountList[], period: string) {
    let currentTotal = 0;
    let previousTotal = 0;
    const dates = getStartEndDates(period);
    const previousDates = getStartEndDates(period, true);
    accounts.forEach((account) => {
      const currentPeriodTransactions = account.Transactions.filter((f) => {
        const itemDate = parseDate(f.Date);
        return itemDate >= dates.startDate && itemDate <= dates.endDate;
      });
      const previousPeriodTransactions = account.Transactions.filter((f) => {
        const itemDate = parseDate(f.Date);
        return (
          itemDate >= previousDates.startDate &&
          itemDate <= previousDates.endDate
        );
      });

      currentTotal += currentPeriodTransactions.reduce(
        (total, txn) => total + txn.Amount,
        0
      );
      previousTotal += previousPeriodTransactions.reduce(
        (total, txn) => total + txn.Amount,
        0
      );
    });

    if (previousTotal === 0) return "No previous data to compare.";

    const change = ((currentTotal - previousTotal) / previousTotal) * 100;

    if (change > 0) {
      return `Spending has increased by ${change.toFixed(2)}% compared to the previous period.`;
    } else if (change < 0) {
      return `Spending has decreased by ${Math.abs(change).toFixed(2)}% compared to the previous period.`;
    } else {
      return "Spending remains the same as the previous period.";
    }
  }

  function calculateTotalFeesPaid(accounts: AccountList[], period: string) {
    let totalFees = 0;
    const dates = getStartEndDates(period);
    accounts.forEach((account) => {
      account.Transactions.filter((f) => {
        const itemDate = parseDate(f.Date);
        return itemDate >= dates.startDate && itemDate <= dates.endDate;
      }).forEach((transaction) => {
        if (transaction.isFee) {
          totalFees += transaction.Amount;
        }
      });
    });

    return totalFees;
  }

  const getProjectedSavings = (accounts: AccountList[], period: string) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const dates = getStartEndDates(period);
    accounts.forEach((account) =>
      account.Transactions.filter((f) => {
        const itemDate = parseDate(f.Date);
        return itemDate >= dates.startDate && itemDate <= dates.endDate;
      }).forEach((transaction) => {
        if (transaction.Amount > 0) {
          totalIncome += transaction.Amount;
        } else {
          totalExpenses -= transaction.Amount;
        }
      })
    );
    const currentSavings = totalIncome + totalExpenses;

    const totalDays = eachDayOfInterval(
      interval(dates.startDate, dates.endDate)
    ); // Total income - expenses
    const daysElapsed =
      totalDays.findIndex(
        (d) =>
          formatDate(d, "dd/MM/yyyy") === formatDate(new Date(), "dd/MM/yyyy")
      ) + 1; // Get today's day of the month
    const projectedSavings = (currentSavings / daysElapsed) * totalDays.length;

    return projectedSavings;
  };

  interface DailyBalance {
    date: string; // ISO date string (YYYY-MM-DD)
    balance: number; // Balance at the end of the day
  }

  /**
   * Calculates daily balances for an account over a specified date range.
   * @param initialBalance - The initial balance of the account.
   * @param transactions - The list of transactions for the account.
   * @param startDate - The start date of the interval.
   * @param endDate - The end date of the interval.
   * @returns An array of DailyBalance objects for each day in the interval.
   */
  function calculateDailyBalances(
    initialBalance: number,
    transactions: Transaction[],
    period: string
  ): DailyBalance[] {
    const dailyBalances: DailyBalance[] = [];
    let currentBalance = initialBalance;
    const dates = getStartEndDates(period);
    // Create a map to store transactions by date
    const transactionMap: { [key: string]: Transaction[] } = {};

    transactions.forEach((transaction) => {
      const dateKey = transaction.Date; // Get the date in YYYY-MM-DD format
      if (!transactionMap[dateKey]) {
        transactionMap[dateKey] = [];
      }
      transactionMap[dateKey].push(transaction);
    });
    const days = eachDayOfInterval({
      start: dates.startDate,
      end: new Date(),
    });

    days.forEach((day) => {
      const dateKey = format(day, "dd/MM/yyyy"); // Format the current day
      // Apply any transactions that occurred on this day
      if (transactionMap[dateKey]) {
        transactionMap[dateKey].forEach((transaction) => {
          if (transaction.transactionType == 0)
            currentBalance -= transaction.Amount;
          else currentBalance += transaction.Amount;
        });
      }

      // Add the current date and balance to the results
      dailyBalances.push({
        date: dateKey,
        balance: currentBalance,
      });
    });

    return dailyBalances;
  }

  return {
    getProjectedSavings,
    calculateTotalFeesPaid,
    spendingTrend,
    calculateNetWorthChange,
    calculateDailyBalances,
    calculateAssetsAndDebts,
    isAsset,
    isDebt,
  };
};

export default useAccountInsights;
