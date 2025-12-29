import { useMutation } from "@tanstack/react-query";
import { transactionsService } from "..";

export function useUpdateTransactionMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.update,
  });

  return {
    isUpdating: isPending,
    updateTransaction: mutateAsync
  }
}