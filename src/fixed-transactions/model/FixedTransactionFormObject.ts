import Category from "../../categories/model/Category";

export default interface FixedTransactionFormObject {
  Name: string;
  icon: string;
  amount: number;
  selectedTT: string;
  paymentDay: number;
  periodicity: number;
  selectedCategories: {
    data: Category;
    checked: boolean;
  }[];
}
