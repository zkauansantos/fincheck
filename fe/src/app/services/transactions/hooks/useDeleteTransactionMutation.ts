import { useMutation } from "@tanstack/react-query";
import { transactionsService } from "..";

export function useDeleteTransactionMutation() {
  const { isPending, mutateAsync } =
    useMutation({
      mutationFn: transactionsService.delete,
    });

  return {
    isDeleting: isPending,
    deleteTransaction: mutateAsync
  }
}