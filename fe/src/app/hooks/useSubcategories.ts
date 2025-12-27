import { useQuery } from "@tanstack/react-query";
import { subcategoriesService } from "../services/subcategories";
import { GetAllSubCategoriesParams } from "../services/subcategories/getAll";



export default function useSubcategories({ categoryId }: GetAllSubCategoriesParams) {
  const { data, isFetching } = useQuery({
    queryKey: ["sub-categories", categoryId],
    queryFn: () => subcategoriesService.getAll({ categoryId }),
    enabled: !!categoryId,
  });

  return {
    subCategories: data ?? [],
    isFetching,
  };
}
