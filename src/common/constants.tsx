import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
} from "react-icons/lu";
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
    name: "Expenses",
    icon: LuArrowUpFromLine,
  },
  {
    id: 1,
    name: "Income",
    icon: LuArrowDownToLine,
  },
  {
    id: 2,
    name: "Mixed",
    icon: LuArrowDownUp,
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

export const timePeriods = [
  {
    id: 0,
    name: "Monthly",
    period: 1,
  },
  {
    id: 1,
    name: "Quarterly",
    period: 4,
  },
  {
    id: 2,
    name: "Half-yearly",
    period: 6,
  },
  {
    id: 3,
    name: "Yearly",
    period: 12,
  },
];
