import useDashboard from "../../useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { toast } from "react-hot-toast";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
  name: z.string().nonempty("Nome da conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(bankAccountsService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { color, initialBalance, name, type } = data;

    try {
      await mutateAsync({
        color,
        name,
        type,
        initialBalance: currencyStringToNumber(initialBalance),
      });
      toast.success("Conta cadastrada com sucesso!");
      queryClient.invalidateQueries(["bank-accounts"]);
      closeNewAccountModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta!");
      reset();
    }
  });

  return {
    register,
    handleSubmit,
    isLoading,
    errors,
    control,
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
