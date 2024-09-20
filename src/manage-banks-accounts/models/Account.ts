import { UUID } from "crypto";

export default interface Account {
  Id?: number | undefined;
  Name: string;
  Types: number[];
  InitialBalance?: number;
  Balance?: number;
  bankId?: number;
  bankName?: string;
  userId: UUID;
  deleted?: boolean;
}
