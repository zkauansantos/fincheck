import { useMutation } from "@tanstack/react-query";
import { bankAccountsService } from "..";

export function useUpdateBankAccountMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.update,
  });

  return {
    isUpdating: isPending,
    updateBankAccount: mutateAsync
  }
}