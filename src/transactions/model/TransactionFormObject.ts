import Category from "../../categories/model/Category";

export default interface TransactionFormObject {
  amount: string;
  date: Date;
  description: string;
  selectedTT: string;
  selectedAccount: string;
  Name: string;
  selectedFixedId: string;
  isCreditCardPayment: boolean;
  selectedCreditCard?: string;
  selectedCategories: {
    data: Category;
    checked: boolean;
  }[];
}
