import { create } from "zustand";
import Category, { fallbackCategory } from "../../categories/model/Category";

interface CategoryStore {
  category: Category;
  isValueSet: boolean;
  setCategory: (category: Category) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  category: fallbackCategory,
  isValueSet: false,
  setCategory: (category: Category) =>
    set((store) => ({ ...store, category: category, isValueSet: true })),
}));

export default useCategoryStore;
