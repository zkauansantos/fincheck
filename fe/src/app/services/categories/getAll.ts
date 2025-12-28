import { formatQueryParams } from "@/app/utils/formatQueryParams";
import { Category } from "@/app/entities/Category";
import { httpClient } from "../httpClient";

type GetAllCategoriesResponse = Array<Category>;

type GetAllCategoriesParams = {
  type?: Category['type'] | null
}

export default async function getAll(filters?: GetAllCategoriesParams) {
  const params = formatQueryParams(filters);

  const { data } = await httpClient.get<GetAllCategoriesResponse>(`/categories${params}`);

  return data;
}
