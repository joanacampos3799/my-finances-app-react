import TransactionType from "./TransactionType";

export default interface Category {
    Id: number,
    Name: string,
    Icon: string,
    MonthlySpent?: number,
    MonthlyEarned?: number,
    TransactionType: TransactionType
}