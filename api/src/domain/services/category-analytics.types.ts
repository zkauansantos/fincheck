import { TransactionType } from '../enums/transaction-type.enum';

export interface CategoryAnalyticsData {
  type: TransactionType;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  months: number[];
  totalIncome: number;
  totalExpense: number;
  averageIncome: number;
  averageExpense: number;
}

export interface FinancialSummary {
  monthlyIncome: number[];
  monthlyExpenses: number[];
  monthlyNetSavings: number[];
  monthlyFinalBalance: number[];
  totalIncome: number;
  totalExpenses: number;
  totalNetSavings: number;
  averageIncome: number;
  averageExpenses: number;
}

export interface AnalyticsResult {
  incomingCategories: CategoryAnalyticsData[];
  expenseCategories: CategoryAnalyticsData[];
  summary: FinancialSummary;
}
