import { useMutation } from "@tanstack/react-query";
import { subcategoriesService } from "..";

export function useCreateSubcategoryMutation() {
  const { isPending: isCreating, mutateAsync: createSubcategory } = useMutation({
    mutationFn: subcategoriesService.create,
  });

  return {
    isCreating,
    createSubcategory
  }
}