import { useMutation } from "@tanstack/react-query";
import { transactionsService } from "..";

export function useCreateTransactionMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  return {
    isPending,
    createTransaction: mutateAsync
  }
}