import { useMutation } from "@tanstack/react-query";
import { subcategoriesService } from "..";

export function useUpdateSubcategoryMutation() {
  const { isPending: isUpdating, mutateAsync: updateSubcategory } = useMutation({
    mutationFn: subcategoriesService.update,
  });

  return {
    isUpdating,
    updateSubcategory
  }
}