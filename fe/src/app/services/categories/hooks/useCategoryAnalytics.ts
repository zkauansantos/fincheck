import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../../transactions';
import { GetCategoryAnalyticsParams } from '../../transactions/getCategoryAnalytics';

export default function useCategoryAnalytics(
  filters: GetCategoryAnalyticsParams
) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['transactions', 'analytics', filters.year, filters.bankAccountId],
    queryFn: () => transactionsService.getCategoryAnalytics(filters),
  });

  return {
    expenseCategories: data?.expenseCategories ?? [],
    incomingCategories: data?.incomingCategories ?? [],
    summary: data?.summary ?? {
      monthlyIncome: Array(12).fill(0),
      monthlyExpenses: Array(12).fill(0),
      monthlyNetSavings: Array(12).fill(0),
      monthlyFinalBalance: Array(12).fill(0),
      totalIncome: 0,
      totalExpenses: 0,
      totalNetSavings: 0,
      averageIncome: 0,
      averageExpenses: 0,
    },
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetch,
  };
}
