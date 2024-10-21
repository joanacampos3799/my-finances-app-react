import { UUID } from "crypto";
import Category from "../../categories/model/Category";

export default interface Transaction {
  Id: number;
  Name: string;
  Description?: string;
  Date: string;
  accountId: number;
  Amount: number;
  categories: Category[];
  userId: UUID;
  transactionType: number;
  fixedTransactionId?: number;
  isFee: boolean;
  deleted?: boolean;
}
