import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export default async function update({
  name,
  bankAccountId,
  categoryId,
  date,
  id,
  value,
  type,
}: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, {
    name,
    bankAccountId,
    categoryId,
    date,
    value,
    type,
  });

  return data;
}
