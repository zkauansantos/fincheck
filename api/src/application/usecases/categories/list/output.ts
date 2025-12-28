import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export interface CategoryDto {
  id: string;
  userId: string | null;
  name: string;
  icon: string;
  type: TransactionType;
}

export type ListCategoriesUseCaseOutput = CategoryDto[];
