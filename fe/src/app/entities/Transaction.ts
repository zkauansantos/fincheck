export interface Transaction {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
