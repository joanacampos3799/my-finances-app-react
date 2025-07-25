import { UUID } from "crypto";

export default interface FixedTransaction {
  Id?: number | undefined;
  Name: string;
  Amount: number;
  PaymentDay: number;
  Icon: string;
  category: number;
  Periodicity: number;
  userId: UUID;
  transactionType: number;
  active: boolean;
  account: number;
}
