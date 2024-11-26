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
  Goals?: Goal[];
  userId: UUID;
}

export interface Payment {
  Id: number;
  Amount: number;
  Date: DateObj;
}

export interface Goal {
  Id?: number;
  Goal: number;
  SavedAmount: number;
  Name: string;
  TargetDate: DateObj;
  AccountId: number;
}

export interface GoalFormObject {
  Goal: number;

  Name: string;
  TargetDate: Date;
}

export const fallbackAccount: Account = {
  Name: "Account",
  userId: `0000-0000-0000-0000-0000`,
  Id: 0,
  Balance: 0,
  InitialBalance: 0,
  Transactions: [] as Transaction[],
  Debts: [],
  Type: 0,
};
