import { UUID } from "crypto";

export default interface Transaction {
  Id?: number | undefined;
  Name: string;
  Description?: string;
  Date: string;
  accountId: number;
  Amount: number;
  categories: number[];
  userId: UUID;
  transactionType: number;
  fixedTransactionId?: number;
  deleted?: boolean;
}
