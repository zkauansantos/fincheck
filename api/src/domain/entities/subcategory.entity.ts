import { Entity } from './entity';

export interface SubcategoryProps {
  id?: string;
  categoryId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Subcategory extends Entity {
  private readonly categoryId: string;
  private name: string;

  private constructor(props: SubcategoryProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.categoryId = props.categoryId;
    this.name = props.name;
  }

  static create(props: SubcategoryProps): Subcategory {
    this.validateProps(props);
    return new Subcategory(props);
  }

  static reconstitute(props: SubcategoryProps): Subcategory {
    return new Subcategory(props);
  }

  private static validateProps(props: SubcategoryProps): void {
    if (props.id && this.isInvalidId(props.id)) {
      throw new Error('Invalid subcategory ID format');
    }

    if (!props.categoryId) {
      throw new Error('Category ID is required');
    }

    if (this.isInvalidId(props.categoryId)) {
      throw new Error('Invalid category ID format');
    }

    if (!props.name) {
      throw new Error('Subcategory name is required');
    }

    if (this.isEmpty(props.name)) {
      throw new Error('Subcategory name cannot be empty');
    }
  }

  getCategoryId(): string {
    return this.categoryId;
  }

  getName(): string {
    return this.name;
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Subcategory name is required');
    }

    if (Subcategory.isEmpty(newName)) {
      throw new Error('Subcategory name cannot be empty');
    }

    if (this.name !== newName) {
      this.name = newName;
      this.touch();
    }
  }

  belongsToCategory(categoryId: string): boolean {
    return this.categoryId === categoryId;
  }
}
