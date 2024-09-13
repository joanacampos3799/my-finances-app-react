import MovementType from "../movement-types/MovementType";

export const queryKeys = {
  categories: "categories",
  banks: "banks",
  accounts: "accounts",
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
};

export const movementTypes: MovementType[] = [
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
