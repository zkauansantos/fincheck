import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface GetCategoryByIdUseCaseOutput {
  id: string;
  userId: string | null;
  name: string;
  icon: string;
  type: TransactionType;
}
