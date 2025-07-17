import Category from "../../categories/model/Category";
import { EntitySelected } from "../../common/helper";

export default interface FixedTransactionFormObject {
  Name: string;
  icon: string;
  amount: string;
  selectedTT: string;
  selectedAccount: string;
  paymentDay: number;
  periodicity: number;
  selectedCategoryId: string;
}
