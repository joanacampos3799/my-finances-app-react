import { UUID } from "crypto";

export default interface Account {
  Id?: number | undefined;
  Name: string;
  CreditCard: boolean;
  InitialBalance: number;
  Balance: number;
  userId: UUID;
}
