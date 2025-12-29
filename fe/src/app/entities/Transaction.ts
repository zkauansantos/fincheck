import { Category } from "./Category";

export interface Transaction {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
  category?: Category;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
