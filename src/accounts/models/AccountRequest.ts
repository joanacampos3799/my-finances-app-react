import { UUID } from "crypto";
import Transaction from "../../transactions/model/Transaction";

export default interface AccountRequest {
  Id?: number;
  userId: UUID;
  Name: string;
  InitialBalance: number;
  SpendingLimit?: number;
  Transactions: Transaction[];
  Type: number;
  institutionId: number;
  jointUserId?: string;
  paymentDueDate?: string;
  interest?: number;
}
