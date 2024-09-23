export default interface FixedTransactionList {
  Id: number;
  Name: string;
  Amount: number;
  Icon: string;
  deleted?: boolean;
  active: boolean;
  transactionType: number;
  categories: number[];
}
