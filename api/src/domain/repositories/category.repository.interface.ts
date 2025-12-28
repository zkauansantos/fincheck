import { Category } from '../entities/category.entity';
import { TransactionType } from '../enums/transaction-type.enum';

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;

  findByIdAndUserId(id: string, userId: string): Promise<Category | null>;

  findAllByUserId(userId: string): Promise<Category[]>;

  findAllAccessibleByUser(userId: string): Promise<Category[]>;

  findAllAccessibleByUserAndType(
    userId: string,
    type: TransactionType,
  ): Promise<Category[]>;

  save(category: Category): Promise<Category>;

  update(category: Category): Promise<Category>;

  delete(id: string): Promise<void>;

  existsById(id: string): Promise<boolean>;
}
