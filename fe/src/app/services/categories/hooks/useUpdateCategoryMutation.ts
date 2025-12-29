import { useMutation } from "@tanstack/react-query";
import { categoriesService } from "..";

export function useUpdateCategoryMutation(){
  const { isPending: isUpdating, mutateAsync: updateCategory } = useMutation({
    mutationFn: categoriesService.update,
  });

  return {
    isUpdating,
    updateCategory
  }
}