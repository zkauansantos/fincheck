import { SubCategory } from "@/app/entities/SubCategory";
import { httpClient } from "../httpClient";

export interface UpdateSubcategoryParams {
  categoryId: string;
  subcategoryId: string;
  name: string;
}

type UpdateSubcategoryResponse = SubCategory;

export async function update({ categoryId, subcategoryId, name }: UpdateSubcategoryParams) {
  const { data } = await httpClient.put<UpdateSubcategoryResponse>(
    `/categories/${categoryId}/subcategories/${subcategoryId}`,
    { name }
  );

  return data;
}
