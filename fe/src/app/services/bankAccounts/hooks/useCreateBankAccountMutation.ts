import { useMutation } from "@tanstack/react-query";
import { bankAccountsService } from "..";

export function useCreateBankAccountMutation() {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
  });

  return {
    isPending,
    createBankAccount: mutateAsync
  }
}