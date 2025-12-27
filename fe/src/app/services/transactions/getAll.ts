import { formatQueryParams } from "@/app/utils/formatQueryParams";
import { Transaction } from "@/app/entities/Transaction";
import { httpClient } from "../httpClient";

export type GetAllTransactionsResponse = Array<Transaction>;

export type GetAllTransactionsParams = {
  year: number;
  month: number;
  bankAccountId?: string;
  type?: Transaction["type"];
};

export default async function getAll(filters: GetAllTransactionsParams) {
  const params = formatQueryParams(filters)

  const { data } = await httpClient.get<GetAllTransactionsResponse>(`/transactions${params}`);

  return data;
}
