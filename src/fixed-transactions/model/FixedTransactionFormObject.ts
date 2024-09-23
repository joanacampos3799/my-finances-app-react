import CategoryList from "../../categories/model/CategoryList";

export default interface FixedTransactionFormObject {
  Name: string;
  icon: string;
  amount: number;
  selectedTT: string;
  paymentDay: number;
  periodicity: number;
  selectedCategories: {
    data: CategoryList;
    checked: boolean;
  }[];
}
