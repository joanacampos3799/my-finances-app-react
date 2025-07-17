import { UUID } from "crypto";
import Category from "../../categories/model/Category";
import Transaction from "../../transactions/model/Transaction";

export default interface FixedTransactionDetails {
  Id?: number | undefined;
  Name: string;
  Amount: number;
  PaymentDay: number;
  Icon: string;
  category: Category;
  Periodicity: number;
  userId: UUID;
  transactionType: number;
  TotalSpent: number;
  active: boolean;
  Transactions: Transaction[];
  Account: string;
}
