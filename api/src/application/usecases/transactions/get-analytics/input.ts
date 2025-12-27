import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface GetCategoryAnalyticsUseCaseInput {
  userId: string;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
}
