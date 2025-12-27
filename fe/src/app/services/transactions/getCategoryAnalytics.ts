import { httpClient } from "../httpClient";

export interface CategoryAnalytics {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  months: number[];
  totalIncome: number;
  totalExpense: number;
  averageIncome: number;
  averageExpense: number;
}

export type CategoryAnalyticsFilters = {
  year: number;
  bankAccountId?: string;
};

export default async function getCategoryAnalytics(
  filters: CategoryAnalyticsFilters
) {
  const { data } = await httpClient.get<CategoryAnalytics[]>(
    '/transactions/analytics',
    {
      params: filters,
    }
  );
  return data;
}
