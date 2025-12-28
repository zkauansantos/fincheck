import { Category } from "@/app/entities/Category";
import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "..";

interface IUseCategoriesParams {
  type?: Category['type'] | null
}

export default function useCategories(filters?: IUseCategoriesParams) {
  const { data, isFetching } = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => categoriesService.getAll(filters),
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
