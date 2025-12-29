import { useMutation } from "@tanstack/react-query";
import { subcategoriesService } from "..";

export function useDeleteSubcategoryMutation() {
  const { isPending: isDeleting, mutateAsync: deleteSubcategory } = useMutation({
    mutationFn: subcategoriesService.delete,
  });

  return {
    isDeleting,
    deleteSubcategory
  }
}