import { UUID } from "crypto";
import Debt from "../../debts/model/Debt";
import Transaction from "../../transactions/model/Transaction";
import InstitutionList from "../../institutions/model/InstitutionList";

export default interface AccountList {
  Id: number;
  Name: string;
  Balance: number;
  InitialBalance: number;
  Transactions: Transaction[];
  Debts: Debt[];
  Type: number;
  Institution?: InstitutionList;
  userId: UUID;
  deleted?: boolean;
}
