import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import useBankAccounts from "../../../../../app/hooks/useBankAccounts";
import useCategories from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import useDashboard from "../../useDashboard";

const schema = z.object({
  value: z.string().nonempty("Informe o valor"),
  name: z.string().nonempty("Inform o nome"),
  categoryId: z.string().nonempty("Inform a categoria"),
  bankAccountId: z.string().nonempty("Informe a conta bancária"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export default function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    control,
    reset,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { bankAccountId, categoryId, date, name, value } = data;

    try {
      await mutateAsync({
        name,
        bankAccountId,
        categoryId,
        date: date.toISOString(),
        type: newTransactionType!,
        value: currencyStringToNumber(value),
      });

      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrar Despesa!"
          : "Erro ao cadastrar Receita!"
      );
      reset();
    }
  });

  return {
    accounts,
    isLoading: isPending,
    register,
    errors,
    control,
    categories,
    handleSubmit,
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  };
}
