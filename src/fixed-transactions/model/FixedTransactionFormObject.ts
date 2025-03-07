import Category from "../../categories/model/Category";
import { EntitySelected } from "../../common/helper";

export default interface FixedTransactionFormObject {
  Name: string;
  icon: string;
  amount: string;
  selectedTT: string;
  paymentDay: number;
  periodicity: number;
  selectedCategories: EntitySelected<Category>[];
}
