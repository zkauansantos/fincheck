import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "..";
import { GetAllCategoriesParams } from "../getAll";

export default function useCategories(filters?: GetAllCategoriesParams) {
  const { data, isFetching } = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => categoriesService.getAll(filters),
    enabled: filters ? !!filters.type : true
  });

  return {
    categories: data ?? [],
    isFetching,
  };
}
