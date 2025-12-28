import { TransactionType } from "@/app/entities/Transaction";
import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
}

export default async function create({
  name,
  bankAccountId,
  categoryId,
  date,
  subcategoryId,
  value,
  type,
}: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", {
    name,
    bankAccountId,
    subcategoryId,
    categoryId,
    date,
    value,
    type,
  });

  return data;
}
