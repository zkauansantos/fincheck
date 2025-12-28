import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface UpdateCategoryUseCaseOutput {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
