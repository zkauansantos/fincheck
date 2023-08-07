import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export default async function create({
  name,
  bankAccountId,
  categoryId,
  date,
  value,
  type,
}: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", {
    name,
    bankAccountId,
    categoryId,
    date,
    value,
    type,
  });

  return data;
}
