import { Category } from "@/app/entities/Category";
import { TransactionType } from "@/app/entities/Transaction";
import { httpClient } from "../httpClient";

export interface CreateCategoryParams {
  name: string;
  icon: string;
  type: TransactionType;
}

type CreateCategoryResponse = Category;

export async function create(params: CreateCategoryParams) {
  const { data } = await httpClient.post<CreateCategoryResponse>("/categories", params);

  return data;
}
