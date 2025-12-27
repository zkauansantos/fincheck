import { formatQueryParams } from "@/app/utils/formatQueryParams";
import { httpClient } from "../httpClient";
import { TransactionType } from "@/app/entities/Transaction";

export interface CategoryAnalytics {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  months: number[];
  type: TransactionType;
  totalIncome: number;
  totalExpense: number;
  averageIncome: number;
  averageExpense: number;
}

export interface AnalyticsSummary {
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

export interface GetCategoryAnalyticsResponse {
  incomingCategories: CategoryAnalytics[];
  expenseCategories: CategoryAnalytics[];
  summary: AnalyticsSummary;
}

export type GetCategoryAnalyticsParams = {
  year: number;
  bankAccountId?: string;
};

export default async function getCategoryAnalytics(
  filters: GetCategoryAnalyticsParams
) {
  const params = formatQueryParams(filters);

  const { data } = await httpClient.get<GetCategoryAnalyticsResponse>(
    `/transactions/analytics${params}`
  );

  return data;
}
