import { Transaction } from '@/app/entities/Transaction';
import { httpClient } from '../httpClient';

export type GetAnnualTransactionsResponse = Array<Transaction>;

export type AnnualTransactionsFilters = {
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
};

export default async function getAnnual(filters: AnnualTransactionsFilters) {
  const { data } = await httpClient.get<GetAnnualTransactionsResponse>(
    '/transactions/annual',
    {
      params: filters,
    }
  );

  return data;
}
