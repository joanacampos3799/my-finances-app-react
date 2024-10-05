import {
  LuArrowDownToLine,
  LuArrowDownUp,
  LuArrowUpFromLine,
} from "react-icons/lu";
import EnumType from "./EnumType";

export const queryKeys = {
  categories: "categories",
  institutions: "institutions",
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
    name: "Investment",
  },
  {
    id: 5,
    name: "Loan",
  },
  {
    id: 6,
    name: "MultiCurrency",
  },
  {
    id: 7,
    name: "Gift Card",
  },
  {
    id: 8,
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
    name: "Credit Provider",
  },

  {
    id: 4,
    name: "Employer-Linked",
  },
  {
    id: 5,
    name: "Investement Firm/Bank",
  },
  {
    id: 6,
    name: "Virtual Bank",
  },
  {
    id: 7,
    name: "E-Wallet",
  },
  {
    id: 8,
    name: "Gift Card Provider",
  },
  {
    id: 9,
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
