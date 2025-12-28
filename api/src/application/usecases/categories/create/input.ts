import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface CreateCategoryUseCaseInput {
  userId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
