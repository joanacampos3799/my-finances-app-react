import Category from "../../categories/model/Category";

export default interface TransactionFormObject {
  amount: string;
  date: Date;
  description: string;
  selectedTT: string;
  selectedAccount: string;
  Name: string;
  selectedFixedId: string;
  isFee: boolean;
  isCreditCardPayment: boolean;
  selectedCreditCard?: string;
  selectedCategories: {
    data: Category;
    checked: boolean;
  }[];
}
