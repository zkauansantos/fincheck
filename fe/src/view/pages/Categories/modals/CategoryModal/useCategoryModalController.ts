import { Category } from "@/app/entities/Category";
import { TransactionType } from "@/app/entities/Transaction";
import { useErrorHandler } from "@/app/hooks/useErrorHandler";
import { useCreateCategoryMutation } from "@/app/services/categories/hooks/useCreateCategoryMutation";

import { useUpdateCategoryMutation } from "@/app/services/categories/hooks/useUpdateCategoryMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  icon: z.string().min(1, "Ícone é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface UseCategoryModalControllerParams {
  category: Category | null;
  type: TransactionType;
  onClose: () => void;
}

export default function useCategoryModalController({
  category,
  type,
  onClose,
}: UseCategoryModalControllerParams) {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name || "",
      icon: category?.icon || "",
    },
  });

  const queryClient = useQueryClient();

  const { handleError } = useErrorHandler();

  const { createCategory, isCreating } = useCreateCategoryMutation()
  const { updateCategory, isUpdating } = useUpdateCategoryMutation();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      if (category) {
        await updateCategory({
          id: category.id,
          name: data.name,
          icon: data.icon,
        });
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await createCategory({
          name: data.name,
          icon: data.icon,
          type,
        });
        toast.success("Categoria criada com sucesso!");
      }

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    } catch (error) {
      handleError(error);
    }
  });

  return {
    register,
    errors,
    isLoading: isCreating || isUpdating,
    handleSubmit,
  };
}
