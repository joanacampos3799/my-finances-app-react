import { UUID } from "crypto";
import Transaction from "../../transactions/model/Transaction";

export default interface Category {
  Id?: number;
  Name: string;
  Budget?: number;
  userId: UUID;
  Icon: string;
  Color: string;
  CategoryType: number;
  Transactions: Transaction[];
  deleted?: boolean;
}
