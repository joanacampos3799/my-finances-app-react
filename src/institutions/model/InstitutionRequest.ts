import AccountList from "../../accounts/models/AccountList";

export default interface InstitutionsRequest {
  Id?: number;
  Name: string;
  Balance?: number;
  Type: number;
  Accounts: AccountList[];
  userId: string;
  deleted?: boolean;
}
