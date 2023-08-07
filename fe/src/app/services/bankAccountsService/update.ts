import { httpClient } from "../httpClient";

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export default async function update({
  id,
  name,
  initialBalance,
  color,
  type,
}: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, {
    name,
    initialBalance,
    color,
    type,
  });

  return data;
}
