export interface SubcategoryProps {
  id: string;
  categoryId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Subcategory {
  private readonly id: string;
  private readonly categoryId: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: SubcategoryProps) {
    this.id = props.id;
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: SubcategoryProps): Subcategory {
    this.validateProps(props);
    return new Subcategory(props);
  }

  static reconstitute(props: SubcategoryProps): Subcategory {
    return new Subcategory(props);
  }

  private static validateProps(props: SubcategoryProps): void {
    if (!props.id) {
      throw new Error('Subcategory ID is required');
    }

    if (this.isInvalidId(props.id)) {
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

    if (this.isNameEmpty(props.name)) {
      throw new Error('Subcategory name cannot be empty');
    }

    if (this.isNameTooShort(props.name)) {
      throw new Error('Subcategory name must be at least 2 characters long');
    }

    if (this.isNameTooLong(props.name)) {
      throw new Error('Subcategory name is too long (max 50 characters)');
    }
  }

  private static isInvalidId(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return !uuidRegex.test(id);
  }

  private static isNameEmpty(name: string): boolean {
    return name.trim().length === 0;
  }

  private static isNameTooShort(name: string): boolean {
    return name.trim().length < 2;
  }

  private static isNameTooLong(name: string): boolean {
    return name.length > 50;
  }

  getId(): string {
    return this.id;
  }

  getCategoryId(): string {
    return this.categoryId;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Subcategory name is required');
    }

    if (Subcategory.isNameEmpty(newName)) {
      throw new Error('Subcategory name cannot be empty');
    }

    if (Subcategory.isNameTooShort(newName)) {
      throw new Error('Subcategory name must be at least 2 characters long');
    }

    if (Subcategory.isNameTooLong(newName)) {
      throw new Error('Subcategory name is too long (max 50 characters)');
    }

    this.name = newName;
    this.touch();
  }

  belongsToCategory(categoryId: string): boolean {
    return this.categoryId === categoryId;
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
