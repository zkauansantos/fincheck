import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface CreateTransactionUseCaseOutput {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string | null;
  subcategoryId: string | null;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
}
