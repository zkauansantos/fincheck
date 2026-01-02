import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "..";
import { GetAllTransactionsParams } from "../getAll";

export default function useTransactions(
  filters: GetAllTransactionsParams,
) {
  const { data, isPending, isLoading, refetch } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isPending,
    isInitialLoading: isLoading,
    refetch,
  };
}
