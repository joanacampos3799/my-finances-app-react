import { UUID } from "crypto";
import Transaction from "../../transactions/model/Transaction";
import InstitutionList from "../../institutions/model/InstitutionList";
import DateObj from "../../common/date";

export default interface Account {
  Id: number;
  Name: string;
  Balance: number;
  InitialBalance: number;
  Transactions: Transaction[];
  Type: number;
  Institution: InstitutionList;
  SpendingLimit?: number;
  PaymentDueDate?: DateObj;
  StatementDate?: DateObj;
  CreditCardPayments?: Payment[];
  Interest?: number;
  userId: UUID;
  DailyBalances: DailyBalance[];
  active: boolean;
  Goal?: number;
}

export interface DailyBalance {
  date: DateObj;
  accountId: number;
  balance: number;
}

export interface Payment {
  Id: number;
  Amount: number;
  Date: DateObj;
  CreditCardId: number;
  AccountName: string;
}

export const fallbackAccount: Account = {
  Name: "Account",
  userId: `0000-0000-0000-0000-0000`,
  Id: 0,
  Balance: 0,
  InitialBalance: 0,
  Transactions: [] as Transaction[],
  Type: 0,
  DailyBalances: [] as DailyBalance[],
  active: true,
  Institution: {} as InstitutionList,
};
