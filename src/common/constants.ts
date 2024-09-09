import MovementType from "../movement-types/MovementType";

export const queryKeys = {
  categories: "categories",
  token: "token",
  user: "user",
};

export const mutationKeys = {
  addCategory: "new-category",
  deleteCategory: "delete-category",
  updateCategory: "update-category",
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
