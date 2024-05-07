import { CategoriesModel } from "../models/CategoriesModel";
import { TransactionType } from "../models/TransactionModel";

export const _baseExpensesCategories: CategoriesModel[] = [
    {
        id: 1,
        name: "Food",
        type: TransactionType.EXPENSES,
        icon: "fast-food"
    },
    {
        id: 2,
        name: "Transport",
        type: TransactionType.EXPENSES,
        icon: "bus"
    },
    {
        id: 3,
        name: "Groceries",
        type: TransactionType.EXPENSES,
        icon: "cart"
    },
    {
        id: 4,
        name: "Entertainment",
        type: TransactionType.EXPENSES,
        icon: "beer"
    },
    {
        id: 5,
        name: "Household",
        type: TransactionType.EXPENSES,
        icon: "basket"
    },
    {
        id: 6,
        name: "Utilities",
        type: TransactionType.EXPENSES,
        icon: "build"
    },
    {
        id: 7,
        name: "Health",
        type: TransactionType.EXPENSES,
        icon: "medkit"
    },
]

export const _baseIncomeCategories: CategoriesModel[] = [
    {
        id: 8,
        name: "Salary",
        type: TransactionType.INCOME,
        icon: "card"
    },
    {
        id: 9,
        name: "Allowance",
        type: TransactionType.INCOME,
        icon: "server"
    },
    {
        id: 10,
        name: "Bonus",
        type: TransactionType.INCOME,
        icon: "trophy"
    },
    {
        id: 11,
        name: "Other",
        type: TransactionType.INCOME,
        icon: "ribbon"
    },
]