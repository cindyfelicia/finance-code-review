export enum TransactionType {
    INCOME = "income",
    EXPENSES = "expense"
}

export enum TransactionAccount {
    CASH = "cash",
    CARD = "card"
}

export interface TransactionModel {
    id: number;
    date: Date;
    amount: string;
    category: number;
    type: TransactionType
    account: TransactionAccount;
    notes: string;
}