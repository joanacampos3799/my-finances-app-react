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
  Notes?: string;
  deleted?: boolean;
  isSalary: boolean;
}

export const fallbackCategory: Category = {
  Id: 0,
  Name: "General",
  Budget: 0,
  userId: "00000000-0000-0000-0000-000000000000",
  Icon: "FaPen",
  Color: "gray",
  CategoryType: 0,
  Transactions: [],
  Notes: "",
  deleted: false,
  isSalary: false,
};
