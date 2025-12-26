import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Transaction } from "../../../../../app/entities/Transaction";
import useBankAccounts from "../../../../../app/hooks/useBankAccounts";
import useCategories from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe um valor"), z.number()]),
  name: z.string().nonempty("Inform o nome"),
  categoryId: z.string().nonempty("Inform a categoria"),
  bankAccountId: z.string().nonempty("Informe a conta bancária"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export default function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateTransaction } = useMutation(
    {
      mutationFn: transactionsService.update
    }
  );
  const { isPending: isPendingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionsService.delete
    });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type
    );
  }, [categoriesList, transaction]);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { bankAccountId, categoryId, date, name, value } = data;
    try {
      await updateTransaction({
        id: transaction!.id,
        name,
        bankAccountId,
        categoryId,
        type: transaction!.type,
        date: date.toISOString(),
        value: currencyStringToNumber(value),
      });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao salvar despesa!"
          : "Erro ao salvar receita!"
      );
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      toast.success(
        transaction!.type === "EXPENSE"
          ? "A despesa foi deletada com sucesso!"
          : "A receita foi deletada com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao deletar a despesa!"
          : "Erro ao deltar a receita!"
      );
    }
  }

  return {
    accounts,
    errors,
    control,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    isLoadingDelete: isPendingDelete,
    register,
    handleSubmit,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
