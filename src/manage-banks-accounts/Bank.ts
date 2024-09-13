export interface Bank {
  Id?: number | undefined;
  Name: string;
  Balance?: number;
  userId: string;
  deleted?: boolean;
}
