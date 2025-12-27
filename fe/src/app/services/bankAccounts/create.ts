import { httpClient } from "../httpClient";

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export default async function create({
  name,
  initialBalance,
  color,
  type,
}: CreateBankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", {
    name,
    initialBalance,
    color,
    type,
  });

  return data;
}
