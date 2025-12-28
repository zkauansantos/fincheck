import { httpClient } from "../httpClient";

export interface DeleteSubcategoryParams {
  categoryId: string;
  subcategoryId: string;
}

export async function remove({ categoryId, subcategoryId }: DeleteSubcategoryParams) {
  await httpClient.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
}
