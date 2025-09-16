export default interface MonthlyBudget {
  budget: number;
  month: string; // Format: YYYY-MM
  categoryId: number;
  id?: number;
}
