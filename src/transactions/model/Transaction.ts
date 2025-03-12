import { UUID } from "crypto";
import Category from "../../categories/model/Category";

export default interface Transaction {
  Id: number;
  Name: string;
  Description?: string;
  Date: DateObj;
  accountId: number;
  accountName: string;
  Amount: number;
  categories: Category[];
  userId: UUID;
  transactionType: number;
  fixedTransactionId?: number;
  isCreditCardPayment: boolean;
  creditCardId?: number;
  deleted?: boolean;
}
