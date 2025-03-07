import { UUID } from "crypto";
import Transaction from "../../transactions/model/Transaction";
import InstitutionList from "../../institutions/model/InstitutionList";

export default interface AccountList {
  Id: number;
  Name: string;
  Balance: number;
  InitialBalance: number;
  Transactions: Transaction[];
  Type: number;
  Institution?: InstitutionList;
  PaymentDueDate?: DateObj;
  Interest?: number;
  userId: UUID;
  active: boolean;
  deleted?: boolean;
}
