import CategoryList from "../../../categories/model/CategoryList";

export default interface TransactionFormObject {
  amount: number;
  date: Date;
  description: string;
  selectedTT: string;
  selectedAccount: string;
  Name: string;
  selectedFixedId: string;
  selectedCategories: {
    data: CategoryList;
    checked: boolean;
  }[];
}
