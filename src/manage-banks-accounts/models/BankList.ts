import AccountList from "./AccountList";

export default interface BankList {
  Id: number;
  Name: string;
  Balance?: number;
  Accounts: AccountList[];
  deleted?: boolean;
}
