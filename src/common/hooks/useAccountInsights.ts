import {
  addMonths,
  eachDayOfInterval,
  format,
  formatDate,
  interval,
  subMonths,
} from "date-fns";
import AccountList from "../../accounts/models/AccountList";
import { accountTypes } from "../constants";
import useDateFilter from "./useDateFilter";
import Transaction from "../../transactions/model/Transaction";
import { DailyBalance } from "../../account/Model/Account";

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
    const debtTypes = ["Credit"];
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

  /**
   * Calculates daily balances for an account over a specified date range.
   * @param initialBalance - The initial balance of the account.
   * @param transactions - The list of transactions for the account.
   * @param period - The selected period (e.g., "Monthly", "Weekly").
   * @param accountType - The type of account (0 = Regular, 1 = Credit Card).
   * @param statementDate - The credit card statement date (if applicable).
   * @returns An array of DailyBalance objects for each day in the interval.
   */
  function calculateDailyBalances(
    dailyBalances: DailyBalance[],
    period: string,
    accountType: number,
    statementDate?: DateObj
  ): DailyBalance[] {
    const dates = getStartEndDates(period);

    let statementStartDate: Date | null = null;
    let statementEndDate: Date = new Date();

    if (accountType === 1 && statementDate) {
      const parsedStatementDate = parseDate(statementDate);

      // The current statement period starts from the last occurrence of statementDate
      if (new Date() >= parsedStatementDate) {
        statementStartDate = parsedStatementDate;
      } else {
        statementStartDate = subMonths(parsedStatementDate, 1);
      }

      // The next statement date defines the end of this period
      statementEndDate = addMonths(statementStartDate, 1);
    }

    // Define range for daily balance calculation
    const startDate =
      accountType === 1 && statementStartDate
        ? statementStartDate
        : dates.startDate;

    return dailyBalances.filter((db) => parseDate(db.date) >= startDate);
  }

  /**
   * Calculates the merged daily balances across all accounts.
   * @param accounts - An array of accounts, each with transactions and an initial balance.
   * @param period - The period string used to determine the date range.
   * @returns An array of DailyBalance objects representing the total balance across all accounts per day.
   */
  function calculateMergedDailyBalances(
    accounts: AccountList[], // Array of accounts, each containing a list of daily balances
    period: string // Period in which to merge the daily balances
  ): { date: string; balance: number }[] {
    const dates = getStartEndDates(period);

    // Create a map to store the combined balance for each day
    const dailyBalancesMap: { [date: string]: number } = {};

    // Iterate over each account
    accounts.forEach((account) => {
      const {
        DailyBalances: dailyBalances,
        Type: accountType,
        StatementDate: statementDate,
      } = account;

      let statementStartDate: Date | null = null;
      dates.endDate = new Date(); // The end date will always be the current date

      if (accountType === 1 && statementDate) {
        const parsedStatementDate = parseDate(statementDate);

        // The current statement period starts from the last occurrence of statementDate
        if (new Date() >= parsedStatementDate) {
          statementStartDate = parsedStatementDate;
        } else {
          statementStartDate = subMonths(parsedStatementDate, 1);
        }

        // Set the end date to the next month's start
        dates.endDate = addMonths(statementStartDate, 1);
      }

      // Set the start date based on the account-specific statement start date or the calculated period's start
      const startDate =
        accountType === 1 && statementStartDate
          ? statementStartDate
          : dates.startDate;

      // Process daily balances for this account
      dailyBalances.forEach((db) => {
        const parsedDate = parseDate(db.date);
        const formattedDate = format(parsedDate, "dd/MM/yyyy"); // Use date-fns format function

        // If the date is within the specified range, sum the balance
        if (parsedDate >= startDate && parsedDate <= dates.endDate) {
          if (!dailyBalancesMap[formattedDate]) {
            dailyBalancesMap[formattedDate] = 0;
          }
          dailyBalancesMap[formattedDate] += db.balance;
        }
      });
    });

    // Generate the final result, which will be an array of objects { date, balance }
    const result: { date: string; balance: number }[] = [];

    // Loop through each date in the period and ensure every date is represented
    let currentDate = new Date(dates.startDate);
    while (currentDate <= dates.endDate) {
      const formattedDate = format(currentDate, "dd/MM/yyyy"); // Format as dd/MM/yyyy
      result.push({
        date: formattedDate,
        balance: dailyBalancesMap[formattedDate] || 0, // If no balance for the date, set it to 0
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return result;
  }

  return {
    getProjectedSavings,
    spendingTrend,
    calculateNetWorthChange,
    calculateDailyBalances,
    calculateAssetsAndDebts,
    isAsset,
    isDebt,
    calculateMergedDailyBalances,
  };
};

export default useAccountInsights;
