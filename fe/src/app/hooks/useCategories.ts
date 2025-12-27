import { useQuery } from "@tanstack/react-query";
import { Category } from "../entities/Category";
import { categoriesService } from "../services/categories";

interface IUseCategoriesParams {
  type?: Category['type'] | null
}

export default function useCategories(filters?: IUseCategoriesParams) {
  const { data, isFetching } = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => categoriesService.getAll(),
    enabled: !!filters?.type
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
