import Category from "../../categories/model/Category";

export default interface TransactionFormObject {
  amount: string;
  date: Date;
  description: string;
  selectedTT: string;
  selectedAccount: string;
  Name: string;
  isCreditCardPayment: boolean;
  selectedCreditCard?: string;
  selectedCategory: string;
  selectedTransferAccount?: string;
}
