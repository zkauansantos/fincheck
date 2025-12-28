import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface CreateTransactionUseCaseInput {
  userId: string;
  bankAccountId: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
}
