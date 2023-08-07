import { httpClient } from "../httpClient";

export default async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`);

  return data;
}
