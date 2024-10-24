import { UUID } from "crypto";
import Debt from "../../debts/model/Debt";
import Transaction from "../../transactions/model/Transaction";
import InstitutionList from "../../institutions/model/InstitutionList";

export default interface Account {
  Id: number;
  Name: string;
  Balance: number;
  InitialBalance: number;
  Transactions: Transaction[];
  Debts: Debt[];
  Type: number;
  Institution?: InstitutionList;
  SpendingLimit?: number;
  PaymentDueDate?: DateObj;
  Payments?: Payment[];
  Interest?: number;
  JointUserName?: string;
  userId: UUID;
}

export interface Payment {
  Id: number;
  Amount: number;
  Date: DateObj;
}

export const fallbackAccount: Account = {
  Name: "Account",
  userId: `0000-0000-0000-0000-0000`,
  Id: 0,
  Balance: 0,
  InitialBalance: 0,
  Transactions: [],
  Debts: [],
  Type: 0,
};
