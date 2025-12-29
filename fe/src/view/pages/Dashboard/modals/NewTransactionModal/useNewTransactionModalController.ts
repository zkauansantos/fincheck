
import { TransactionType } from "@/app/entities/Transaction";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import useBankAccounts from "@/app/services/bankAccounts/hooks/useBankAccounts";
import useCategories from "@/app/services/categories/hooks/useCategories";
import useSubcategories from "@/app/services/categories/hooks/useSubcategories";
import { useCreateTransactionMutation } from "@/app/services/transactions/hooks/useCreateTransactionMutation";
import currencyStringToNumber from "@/app/utils/currencyStringToNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import useDashboard from "../../useDashboard";

const schema = z.object({
  value: z.string().nonempty("Informe o valor"),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  subcategoryId: z.string().nonempty("Informe a categoria secundária"),
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
    watch,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const categoryId = watch('categoryId');

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories } = useCategories({ type: newTransactionType });
  const { subCategories } = useSubcategories({ categoryId });


  const { createTransaction, isPending } = useCreateTransactionMutation();
  const { handleError } = useErrorHandler();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { bankAccountId, categoryId, date, name, value, subcategoryId } = data;

    try {
      await createTransaction({
        name,
        bankAccountId,
        subcategoryId,
        categoryId,
        date: date.toISOString(),
        type: newTransactionType!,
        value: currencyStringToNumber(value),
      });

      toast.success(
        newTransactionType === TransactionType.EXPENSE
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
      closeNewTransactionModal();
      reset();
    } catch (error) {
      handleError(error);
    }
  });

  return {
    accounts,
    isLoading: isPending,
    register,
    errors,
    control,
    categories,
    subCategories,
    handleSubmit,
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  };
}
