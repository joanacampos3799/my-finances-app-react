import { UUID } from "crypto";

export default interface FixedTransactionDetails {
  Id?: number | undefined;
  Name: string;
  Amount: number;
  PaymentDay: number;
  Icon: string;
  categories: number[];
  Periodicity: number;
  userId: UUID;
  transactionType: number;
  TotalSpent: number;
}
