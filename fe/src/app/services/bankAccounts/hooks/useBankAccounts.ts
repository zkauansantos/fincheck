import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "..";

export default function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ["bank-accounts"],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  });

  return {
    accounts: data ?? [],
    isFetching,
  };
}
