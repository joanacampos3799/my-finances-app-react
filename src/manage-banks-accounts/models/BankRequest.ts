import AccountList from "./AccountList";

export default interface BankRequest {
  Id?: number;
  Name: string;
  Balance?: number;
  Accounts: AccountList[];
  userId: string;
  deleted?: boolean;
}
