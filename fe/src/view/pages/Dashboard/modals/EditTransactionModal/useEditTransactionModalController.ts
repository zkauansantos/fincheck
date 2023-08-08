import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useBankAccounts from "../../../../../app/hooks/useBankAccounts";
import useCategories from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";

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
  const { isLoading, mutateAsync: updateTransaction } = useMutation(
    transactionsService.update
  );
  const { isLoading: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation(transactionsService.delete);

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
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["bank-accounts"]);
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
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["bank-accounts"]);
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
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    register,
    handleSubmit,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
