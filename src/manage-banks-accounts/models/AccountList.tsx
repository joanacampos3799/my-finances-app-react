import Debt from "../../debts/model/Debt";
import Transaction from "../../transactions/model/Transaction";

export default interface AccountList {
  Id: number;
  Name: string;
  Balance: number;
  Transactions: Transaction[];
  Debts: Debt[];
  types: number[];
  deleted?: boolean;
}
