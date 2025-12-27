import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "..";
import { GetAllTransactionsParams } from "../getAll";

export default function useTransactions(
  filters: GetAllTransactionsParams,
) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading: isLoading,
    refetch,
  };
}
