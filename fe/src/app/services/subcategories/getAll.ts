import { SubCategory } from "@/app/entities/SubCategory";
import { httpClient } from "../httpClient";

type GetAllsubCategoriesResponse = Array<SubCategory>;

export type GetAllSubCategoriesParams = {
  categoryId: string;
}

export default async function getAll({ categoryId }: GetAllSubCategoriesParams) {
  const { data } = await httpClient.get<GetAllsubCategoriesResponse>(`/categories/${categoryId}/subcategories`);

  return data;
}
