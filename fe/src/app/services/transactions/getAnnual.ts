import { Transaction } from '@/app/entities/Transaction';
import { formatQueryParams } from '@/app/utils/formatQueryParams';
import { httpClient } from '../httpClient';

export type GetAnnualTransactionsResponse = Array<Transaction>;

export type GetAnnualTransactionsParams = {
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
};

export default async function getAnnual(filters: GetAnnualTransactionsParams) {
  const params = formatQueryParams(filters);

  const { data } = await httpClient.get<GetAnnualTransactionsResponse>(
    `/transactions/annual${params}`,
  );

  return data;
}
