export default interface CategoryList {
  Id: number;
  Name: string;
  Icon: string;
  MonthlySpent?: number;
  MonthlyEarned?: number;
  deleted?: boolean;
}
