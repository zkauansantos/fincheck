import useDashboard from "../../useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: updateAccount } = useMutation(
    bankAccountsService.update
  );

  const { isLoading: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation(bankAccountsService.delete);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { color, initialBalance, name, type } = data;

    try {
      await updateAccount({
        color,
        name,
        type,
        initialBalance: currencyStringToNumber(initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries(["bank-accounts"]);
      toast.success("A Conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar as informações!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);
      toast.success("A Conta foi deletada com sucesso!");
      queryClient.invalidateQueries(["bank-accounts"]);
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar a conta!");
    }
  }

  return {
    register,
    handleSubmit,
    isLoading,
    errors,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    control,
    isEditAccountModalOpen,
    handleDeleteAccount,
    closeEditAccountModal,
    isDeleteModalOpen,
    isLoadingDelete,
  };
}
