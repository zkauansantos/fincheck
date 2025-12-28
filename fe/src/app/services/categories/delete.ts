import { httpClient } from "../httpClient";

export async function remove(categoryId: string) {
  await httpClient.delete(`/categories/${categoryId}`);
}
