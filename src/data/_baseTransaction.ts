import { BaseModel } from "../models/BaseModel";
import { TransactionAccount, TransactionType } from "../models/TransactionModel";

export const _transactionType: BaseModel[] = [
    {
        id: TransactionType.EXPENSES,
        name: TransactionType.EXPENSES.valueOf()
    },
    {
        id: TransactionType.INCOME,
        name: TransactionType.INCOME.valueOf()
    }
]

export const _transactionAccount: BaseModel[] = [
    {
        id: TransactionAccount.CARD,
        name: TransactionAccount.CARD.valueOf()
    },
    {
        id: TransactionAccount.CASH,
        name: TransactionAccount.CASH.valueOf()
    }
]