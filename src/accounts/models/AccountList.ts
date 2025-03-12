import { UUID } from "crypto";
import Transaction from "../../transactions/model/Transaction";
import InstitutionList from "../../institutions/model/InstitutionList";
import { DailyBalance } from "../../account/Model/Account";

export default interface AccountList {
  Id: number;
  Name: string;
  Balance: number;
  InitialBalance: number;
  Transactions: Transaction[];
  DailyBalances: DailyBalance[];
  Type: number;
  Institution?: InstitutionList;
  PaymentDueDate?: DateObj;
  StatementDate?: DateObj;
  Interest?: number;
  userId: UUID;
  active: boolean;
  deleted?: boolean;
}
