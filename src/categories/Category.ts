import { UUID } from "crypto";

export default interface Category {
    Id?: number,
    Name: string,
    Icon: string,
    userId: UUID,
    MonthlySpent?: number,
    MonthlyEarned?: number,
    CategoryType: number
}