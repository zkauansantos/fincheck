import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { useDeleteBankAccountMutation } from "@/app/services/bankAccounts/hooks/useDeleteBankAccountMutation";
import { useUpdateBankAccountMutation } from "@/app/services/bankAccounts/hooks/useUpdateBankAccountMutation";
import currencyStringToNumber from "@/app/utils/currencyStringToNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import useDashboard from "../../useDashboard";

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

  const { isUpdating, updateBankAccount } = useUpdateBankAccountMutation()
  const { isDeleting, deleteBankAccount } = useDeleteBankAccountMutation()


  const { handleError } = useErrorHandler();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { color, initialBalance, name, type } = data;

    try {
      await updateBankAccount({
        color,
        name,
        type,
        initialBalance: currencyStringToNumber(initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      toast.success("A Conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch (error) {
      handleError(error);
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
      await deleteBankAccount(accountBeingEdited!.id);
      toast.success("A Conta foi deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      closeEditAccountModal();
    } catch (error) {
      handleError(error);
    }
  }

  return {
    register,
    handleSubmit,
    isLoading: isUpdating,
    errors,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    control,
    isEditAccountModalOpen,
    handleDeleteAccount,
    closeEditAccountModal,
    isDeleteModalOpen,
    isLoadingDelete: isDeleting,
  };
}
