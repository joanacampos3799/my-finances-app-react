import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  format,
  formatDate,
  interval,
  subMonths,
} from "date-fns";
import AccountList from "../../accounts/models/AccountList";
import { accountTypes } from "../constants";
import useDateFilter from "./useDateFilter";
import Account, { DailyBalance } from "../../account/Model/Account";
import DateObj from "../date";

const useAccountInsights = () => {
  const { parseDate, getStartEndDates } = useDateFilter();
  // Helper functions to determine if the account type is an asset or debt
  const isAsset = (type: number): boolean => {
    // Define the asset types
    const assetTypes = [
      "Savings",
      "Debit",
      "Investment",
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
    month?: string,
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
          totalDebts += account.StatementBalance ?? 0;
        }
      });
    else {
      if (month === undefined) month = format(new Date(), "MMMM yyyy");
      const dates = getStartEndDates(period, month, previous);
      if (!dates || !dates.startDate || !dates.endDate) {
        totalAssets = 0;
        totalDebts = 0;
      }

      accounts.forEach((account) => {
        let balance = 0;
        if (previous)
          balance =
            account.DailyBalances.find(
              (db) => parseDate(db.date) == dates.endDate
            )?.balance ?? 0;
        else balance = account.DailyBalances.at(-1)?.balance ?? 0;
        if (isAsset(account.Type)) {
          totalAssets += account.Balance;
        }

        if (isDebt(account.Type)) {
          totalDebts += account.StatementBalance ?? 0;
        }
      });
    }

    return { totalAssets, totalDebts };
  };
  const calculateNetWorthChange = (
    accounts: AccountList[],
    period: string,
    month: string
  ) => {
    const { totalAssets: currentAssets, totalDebts: currentDebts } =
      calculateAssetsAndDebts(accounts, period, month);
    const netWorth = currentAssets - currentDebts;
    const { totalAssets: previousAssets, totalDebts: previousDebts } =
      calculateAssetsAndDebts(accounts, period, month, true);

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

  function spendingTrend(
    accounts: AccountList[],
    period: string,
    month: string
  ) {
    let currentTotal = 0;
    let previousTotal = 0;
    const dates = getStartEndDates(period, month);
    const previousDates = getStartEndDates(period, month, true);
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

  const getProjectedSavings = (
    accounts: AccountList[],
    period: string,
    month: string
  ) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    const dates = getStartEndDates(period, month);
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
    month: string,
    account: Account
  ): DailyBalance[] {
    const dates = getStartEndDates(period, month);

    let statementStartDate: Date | null = null;
    let statementEndDate: Date = new Date();

    if (account.Type === 1 && account.StatementDate) {
      const parsedStatementDate = parseDate(account.StatementDate);

      // Determine statement start date
      if (new Date() >= parsedStatementDate) {
        statementStartDate = parsedStatementDate;
      } else {
        statementStartDate = subMonths(parsedStatementDate, 1);
      }

      // Determine statement end date
      statementEndDate = addMonths(statementStartDate, 1);
    }

    // Set range for daily balance calculation
    const startDate =
      account.Type === 1 && statementStartDate
        ? statementStartDate
        : dates.startDate;

    const endDate = statementEndDate; // Use statement end or today

    // Generate all days in the range
    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    // Convert dailyBalances to a map for quick lookup
    const balanceMap = new Map(
      dailyBalances.map((db) => [
        format(parseDate(db.date), "yyyy-MM-dd"),
        db.balance,
      ])
    );

    let lastKnownBalance = account.Balance;

    // Fill in missing days
    return allDays.map((day) => {
      const dateKey = format(day, "yyyy-MM-dd");

      if (balanceMap.has(dateKey)) {
        lastKnownBalance = balanceMap.get(dateKey)!;
      }

      return {
        date: {
          day: day.getDate(),
          month: day.getMonth() + 1,
          year: day.getFullYear(),
        } as DateObj,
        accountId: account.Id,
        balance: lastKnownBalance,
      } as DailyBalance;
    });
  }

  /**
   * Calculates the merged daily balances across all accounts.
   * @param accounts - An array of accounts, each with transactions and an initial balance.
   * @param period - The period string used to determine the date range.
   * @returns An array of DailyBalance objects representing the total balance across all accounts per day.
   */

  return {
    getProjectedSavings,
    spendingTrend,
    calculateNetWorthChange,
    calculateDailyBalances,
    calculateAssetsAndDebts,
    isAsset,
    isDebt,
  };
};

export default useAccountInsights;
