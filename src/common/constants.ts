import EnumType from "./EnumType";

export const queryKeys = {
  categories: "categories",
  banks: "banks",
  accounts: "accounts",
  fixedTransactions: "fixed-transactions",
  fixedTransaction: "fixed-transaction",
  transactions: "transactions",
  token: "token",
  user: "user",
};

export const mutationKeys = {
  addCategory: "new-category",
  deleteCategory: "delete-category",
  updateCategory: "update-category",
  addBank: "new-bank",
  updateBank: "update-bank",
  deleteBank: "delete-bank",
  addAccount: "new-account",
  updateAccount: "update-account",
  deleteAccount: "delete-account",
  addFixedTransaction: "new-fixed-transaction",
  updateFixedTransaction: "update-fixed-transaction",
  deleteFixedTransaction: "update-active-fixed-transaction",
  addTransaction: "new-transaction",
  updateTransaction: "update-transaction",
  deleteTransaction: "delete-transaction",
};

export const movementTypes: EnumType[] = [
  {
    id: 0,
    name: "Both",
  },
  {
    id: 1,
    name: "Expense",
  },
  {
    id: 2,
    name: "Income",
  },
];

export const accountTypes: EnumType[] = [
  {
    id: 0,
    name: "Debit",
  },
  {
    id: 1,
    name: "Credit",
  },
  {
    id: 2,
    name: "Savings",
  },
  {
    id: 3,
    name: "Food",
  },
  {
    id: 4,
    name: "Virtual",
  },
];
