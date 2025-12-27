import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface ListCategoriesUseCaseInput {
  userId: string;
  type?: TransactionType;
}
