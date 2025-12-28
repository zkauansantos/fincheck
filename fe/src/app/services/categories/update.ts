import { Category } from "@/app/entities/Category";
import { httpClient } from "../httpClient";

export interface UpdateCategoryParams {
  id: string;
  name?: string;
  icon?: string;
}

type UpdateCategoryResponse = Category;

export async function update({ id, ...params }: UpdateCategoryParams) {
  const { data } = await httpClient.put<UpdateCategoryResponse>(`/categories/${id}`, params);

  return data;
}
