import { TransactionType } from '../enums/transaction-type.enum';

export interface CategoryProps {
  id: string;
  userId: string | null;
  name: string;
  icon: string;
  type: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  private readonly id: string;
  private readonly userId: string | null;
  private name: string;
  private icon: string;
  private readonly type: TransactionType;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: CategoryProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.icon = props.icon;
    this.type = props.type;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: CategoryProps): Category {
    this.validateProps(props);
    return new Category(props);
  }

  static createDefault(
    id: string,
    name: string,
    icon: string,
    type: TransactionType,
  ): Category {
    return this.create({
      id,
      userId: null,
      name,
      icon,
      type,
    });
  }

  static createCustom(
    id: string,
    userId: string,
    name: string,
    icon: string,
    type: TransactionType,
  ): Category {
    return this.create({
      id,
      userId,
      name,
      icon,
      type,
    });
  }

  static reconstitute(props: CategoryProps): Category {
    return new Category(props);
  }

  private static validateProps(props: CategoryProps): void {
    if (!props.id) {
      throw new Error('Category ID is required');
    }

    if (this.isInvalidId(props.id)) {
      throw new Error('Invalid category ID format');
    }

    if (props.userId && this.isInvalidId(props.userId)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.name) {
      throw new Error('Category name is required');
    }

    if (this.isNameEmpty(props.name)) {
      throw new Error('Category name cannot be empty');
    }

    if (this.isNameTooShort(props.name)) {
      throw new Error('Category name must be at least 2 characters long');
    }

    if (this.isNameTooLong(props.name)) {
      throw new Error('Category name is too long (max 50 characters)');
    }

    if (!props.icon) {
      throw new Error('Category icon is required');
    }

    if (this.isIconEmpty(props.icon)) {
      throw new Error('Category icon cannot be empty');
    }

    if (!props.type) {
      throw new Error('Category type is required');
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

  private static isIconEmpty(icon: string): boolean {
    return icon.trim().length === 0;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getIcon(): string {
    return this.icon;
  }

  getType(): TransactionType {
    return this.type;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Category name is required');
    }

    if (Category.isNameEmpty(newName)) {
      throw new Error('Category name cannot be empty');
    }

    if (Category.isNameTooShort(newName)) {
      throw new Error('Category name must be at least 2 characters long');
    }

    if (Category.isNameTooLong(newName)) {
      throw new Error('Category name is too long (max 50 characters)');
    }

    this.name = newName;
    this.touch();
  }

  updateIcon(newIcon: string): void {
    if (!newIcon) {
      throw new Error('Category icon is required');
    }

    if (Category.isIconEmpty(newIcon)) {
      throw new Error('Category icon cannot be empty');
    }

    this.icon = newIcon;
    this.touch();
  }

  isDefault(): boolean {
    return this.userId === null;
  }

  isCustom(): boolean {
    return this.userId !== null;
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  isAccessibleByUser(userId: string): boolean {
    return this.isDefault() || this.belongsToUser(userId);
  }

  isForIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  isForExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
