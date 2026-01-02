import { useQuery } from "@tanstack/react-query";
import { subcategoriesService } from "../../subcategories";
import { GetAllSubCategoriesParams } from "../../subcategories/getAll";

export default function useSubcategories({ categoryId }: GetAllSubCategoriesParams) {
  const { data, isFetching } = useQuery({
    queryKey: ["sub-categories", categoryId],
    queryFn: () => subcategoriesService.getAll({ categoryId }),
    enabled: !!categoryId,
  });

  return {
    subcategories: data ?? [],
    isFetching,
  };
}
