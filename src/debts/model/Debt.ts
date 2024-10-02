import { UUID } from "crypto";

export default interface Debt {
  Id: number;
  Name: string;
  Balance: number;

  userId: UUID;
  deleted?: boolean;
}
