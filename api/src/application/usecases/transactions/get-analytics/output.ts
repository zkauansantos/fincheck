import { TransactionType } from '@prisma/client';

export type GetCategoryAnalyticsUseCaseOutput = {
  incomingCategories: {
    type: TransactionType;
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    months: number[];
    totalIncome: number;
    totalExpense: number;
    averageIncome: number;
    averageExpense: number;
  }[];
  expenseCategories: {
    type: TransactionType;
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    months: number[];
    totalIncome: number;
    totalExpense: number;
    averageIncome: number;
    averageExpense: number;
  }[];
  summary: {
    monthlyIncome: number[];
    monthlyExpenses: number[];
    monthlyNetSavings: number[];
    monthlyFinalBalance: number[];
    totalIncome: number;
    totalExpenses: number;
    totalNetSavings: number;
    averageIncome: number;
    averageExpenses: number;
  };
};
