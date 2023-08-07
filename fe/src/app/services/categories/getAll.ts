import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

type CategoriesResponse = Array<Category>;

export default async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");

  return data;
}
