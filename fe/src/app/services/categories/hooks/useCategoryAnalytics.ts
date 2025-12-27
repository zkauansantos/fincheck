import { useQuery } from '@tanstack/react-query';
import { CategoryAnalyticsFilters, transactionsService } from '../../transactions';

export default function useCategoryAnalytics(
  filters: CategoryAnalyticsFilters
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
