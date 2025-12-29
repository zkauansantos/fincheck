import { useMutation } from "@tanstack/react-query";
import { categoriesService } from "..";

export function useCreateCategoryMutation() {
  const { isPending: isCreating, mutateAsync: createCategory } = useMutation({
    mutationFn: categoriesService.create,
  });

  return {
    isCreating,
    createCategory
  }
}