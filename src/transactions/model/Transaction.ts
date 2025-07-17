import { UUID } from "crypto";
import Category from "../../categories/model/Category";
import DateObj from "../../common/date";

export default interface Transaction {
  Id: number;
  Name: string;
  Description?: string;
  Date: DateObj;
  accountId: number;
  accountName: string;
  Amount: number;
  category: Category;
  userId: UUID;
  transactionType: number;
  isCreditCardPayment: boolean;
  creditCardId?: number;
  deleted?: boolean;
  transferAccountId?: number;
}
