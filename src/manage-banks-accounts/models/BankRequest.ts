export default interface BankRequest {
  Id?: number;
  Name: string;
  Balance?: number;
  userId: string;
  deleted?: boolean;
}
