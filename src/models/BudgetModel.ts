export interface BudgetModel {
    id: number;
    name: string;
    categories_id: number[];
    amount: number;
}

export interface BudgetAnalysisModel {
    id: number;
    name: string;
    percentage: number;
    icon: string;
}