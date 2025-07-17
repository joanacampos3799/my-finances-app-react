import { UUID } from "crypto";
import Category from "../../categories/model/Category";

export default interface FixedTransactionList {
  Id: number;
  Name: string;
  Amount: number;
  userId: UUID;
  Icon: string;
  deleted?: boolean;
  active: boolean;
  transactionType: number;
  category: Category;
  Periodicity: number;
  PaymentDay: number;
  Account: number;
}
