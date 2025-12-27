import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '..';
import { AnnualTransactionsFilters } from '../getAnnual';

export default function useAnnualTransactions(
  filters: AnnualTransactionsFilters,
) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['transactions', 'annual', filters.year, filters.bankAccountId],
    queryFn: () => transactionsService.getAnnual(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetch,
  };
}
