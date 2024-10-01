import Category from "../../categories/model/Category";

export default interface TransactionFormObject {
  amount: number;
  date: Date;
  description: string;
  selectedTT: string;
  selectedAccount: string;
  Name: string;
  selectedFixedId: string;
  selectedCategories: {
    data: Category;
    checked: boolean;
  }[];
}
