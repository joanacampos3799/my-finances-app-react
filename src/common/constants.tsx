import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
} from "react-icons/lu";
import EnumType from "./EnumType";
import { ReactElement } from "react";

export const queryKeys = {
  categories: "categories",
  institutions: "institutions",
  accounts: "accounts",
  fixedTransactions: "fixed-transactions",
  fixedTransaction: "fixed-transaction",
  transactions: "transactions",
  token: "token",
  user: "user",
  question: "question",
};

export const mutationKeys = {
  addCategory: "new-category",
  deleteCategory: "delete-category",
  updateCategory: "update-category",
  exportCategories: "export-categories",
  addInstitution: "new-institution",
  updateInstitution: "update-institution",
  deleteInstitution: "delete-institution",
  addAccount: "new-account",
  updateAccount: "update-account",
  deleteAccount: "delete-account",
  addFixedTransaction: "new-fixed-transaction",
  updateFixedTransaction: "update-fixed-transaction",
  deleteFixedTransaction: "update-active-fixed-transaction",
  addTransaction: "new-transaction",
  updateTransaction: "update-transaction",
  deleteTransaction: "delete-transaction",
  addQuestion: "new-question",
};
interface MovType extends EnumType {
  MovementIcon: ReactElement;
}
export const movementTypes: MovType[] = [
  {
    id: 0,
    name: "Expenses",
    MovementIcon: <LuArrowUpFromLine />,
  },
  {
    id: 1,
    name: "Income",
    MovementIcon: <LuArrowDownToLine />,
  },
  {
    id: 2,
    name: "Mixed",
    MovementIcon: <LuArrowDownUp />,
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
    name: "Investment",
  },
  {
    id: 5,
    name: "MultiCurrency",
  },
  {
    id: 6,
    name: "Gift Card",
  },
  {
    id: 7,
    name: "Cash",
  },
];

export const institutionTypes: EnumType[] = [
  {
    id: 0,
    name: "Bank",
  },
  {
    id: 1,
    name: "Mutual",
  },
  {
    id: 2,
    name: "Credit Card Firm",
  },
  {
    id: 3,
    name: "Employer-Linked",
  },
  {
    id: 4,
    name: "Investement Firm/Bank",
  },
  {
    id: 5,
    name: "Virtual Bank",
  },
  {
    id: 6,
    name: "E-Wallet",
  },
  {
    id: 7,
    name: "Gift Card Provider",
  },
  {
    id: 8,
    name: "Cash",
  },
];

export const timePeriods = [
  {
    id: 0,
    name: "Weekly",
    period: 0.25,
  },
  {
    id: 1,
    name: "Monthly",
    period: 1,
  },
  {
    id: 2,
    name: "Quarterly",
    period: 3,
  },
  {
    id: 3,
    name: "Half-yearly",
    period: 6,
  },
  {
    id: 4,
    name: "Yearly",
    period: 12,
  },
];
