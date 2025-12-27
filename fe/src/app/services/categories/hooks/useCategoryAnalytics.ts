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
    categoryAnalytics: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetch,
  };
}
