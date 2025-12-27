import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface CreateCategoryUseCaseOutput {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
