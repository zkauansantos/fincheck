import { Subcategory } from '../entities/subcategory.entity';

export interface SubcategoryRepository {
  findById(id: string): Promise<Subcategory | null>;

  findAllByCategoryId(categoryId: string): Promise<Subcategory[]>;

  save(subcategory: Subcategory): Promise<Subcategory>;

  update(subcategory: Subcategory): Promise<Subcategory>;

  delete(id: string): Promise<void>;

  existsById(id: string): Promise<boolean>;

  countByCategoryId(categoryId: string): Promise<number>;
}
