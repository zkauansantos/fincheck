import { useMutation } from "@tanstack/react-query";
import { categoriesService } from "..";

export function useDeleteCategoryMutation() {
  const { isPending: isDeleting, mutateAsync: deleteCategory } = useMutation({
    mutationFn: categoriesService.delete,
  });

  return {
    isDeleting,
    deleteCategory
  }
}