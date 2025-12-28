import { SubCategory } from "@/app/entities/SubCategory";
import { httpClient } from "../httpClient";

export interface CreateSubcategoryParams {
  categoryId: string;
  name: string;
}

type CreateSubcategoryResponse = SubCategory;

export async function create({ categoryId, name }: CreateSubcategoryParams) {
  const { data } = await httpClient.post<CreateSubcategoryResponse>(
    `/categories/${categoryId}/subcategories`,
    { name }
  );

  return data;
}
