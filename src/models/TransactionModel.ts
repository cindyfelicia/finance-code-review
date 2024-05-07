export enum TransactionType {
    INCOME = "income",
    EXPENSES = "expenses"
}

export enum TransactionAccount {
    CASH = "cash",
    CARD = "card"
}

export interface TransactionModel {
    id: number;
    date: string;
    amount: number;
    category: number;
    type: TransactionType
    account: TransactionAccount;
    notes?: string;
}