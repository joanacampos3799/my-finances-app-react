import { UUID } from "crypto";

export default interface Transaction {
  Id?: number | undefined;
  Name: string;
  Description?: string;
  Date: string;
  accountId: number;
  Amount: number;
  category: number;
  userId: UUID;
  transactionType: number;
  isCreditCardPayment: boolean;
  creditCardId?: number;
  transferAccountId?: number;
}
