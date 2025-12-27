import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface ListTransactionsUseCaseInput {
  userId: string;
  month?: number;
  year?: number;
  bankAccountId?: string;
  type?: TransactionType;
}
