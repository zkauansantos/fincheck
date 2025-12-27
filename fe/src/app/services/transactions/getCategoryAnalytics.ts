import { formatQueryParams } from "@/app/utils/formatQueryParams";
import { httpClient } from "../httpClient";

export interface GetCategoryAnalyticsResponse {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  months: number[];
  totalIncome: number;
  totalExpense: number;
  averageIncome: number;
  averageExpense: number;
}

export type GetCategoryAnalyticsParams = {
  year: number;
  bankAccountId?: string;
};

export default async function getCategoryAnalytics(
  filters: GetCategoryAnalyticsParams
) {
  const params = formatQueryParams(filters);

  const { data } = await httpClient.get<GetCategoryAnalyticsResponse[]>(
    `/transactions/analytics${params}`
  );

  return data;
}
