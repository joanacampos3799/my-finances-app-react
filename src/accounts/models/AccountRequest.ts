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
  paymentDueDate?: string;
  statementDate?: string;
  interest?: number;
  active: boolean;
  goal?: number;
}
