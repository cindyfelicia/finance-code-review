import { TransactionType } from "../models/TransactionModel";

export interface CategoriesModel {
    id: number;
    name: string;
    type: TransactionType
    icon?: string;
}