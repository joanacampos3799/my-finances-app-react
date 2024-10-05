import AccountList from "../../accounts/models/AccountList";

export default interface InstitutionList {
  Id: number;
  Name: string;
  Type: number;
  Balance?: number;
  Accounts: AccountList[];
  deleted?: boolean;
}
