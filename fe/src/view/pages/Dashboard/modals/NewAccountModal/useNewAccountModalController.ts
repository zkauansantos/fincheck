import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { useCreateBankAccountMutation } from "@/app/services/bankAccounts/hooks/useCreateBankAccountMutation";
import currencyStringToNumber from "@/app/utils/currencyStringToNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import useDashboard from "../../useDashboard";

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
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending, createBankAccount } = useCreateBankAccountMutation();

  const { handleError } = useErrorHandler();

  const onSubmit = handleSubmit(async (data) => {
    const { color, initialBalance, name, type } = data;

    try {
      await createBankAccount({
        color,
        name,
        type,
        initialBalance: currencyStringToNumber(initialBalance),
      });
      toast.success("Conta cadastrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      closeNewAccountModal();
      reset();
    } catch (error) {
      handleError(error);
      reset();
    }
  });

  return {
    register,
    handleSubmit: onSubmit,
    isLoading: isPending,
    errors,
    control,
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
