import { useMutation } from "@tanstack/react-query";
import { bankAccountsService } from "..";

export function useDeleteBankAccountMutation() {
  const { isPending, mutateAsync } =
    useMutation({
      mutationFn: bankAccountsService.delete,
    });

  return {
    isDeleting: isPending,
    deleteBankAccount: mutateAsync
  }
}