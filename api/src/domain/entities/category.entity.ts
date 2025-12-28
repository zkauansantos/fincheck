import { TransactionType } from '../enums/transaction-type.enum';
import { Entity } from './entity';

export interface CategoryProps {
  id?: string;
  userId: string | null;
  name: string;
  icon: string;
  type: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Entity {
  private readonly userId: string | null;
  private name: string;
  private icon: string;
  private readonly type: TransactionType;

  private constructor(props: CategoryProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.userId = props.userId;
    this.name = props.name;
    this.icon = props.icon;
    this.type = props.type;
  }

  static create(props: CategoryProps): Category {
    this.validateProps(props);
    return new Category(props);
  }

  static reconstitute(props: CategoryProps): Category {
    return new Category(props);
  }

  private static validateProps(props: CategoryProps): void {
    if (props.id && this.isInvalidId(props.id)) {
      throw new Error('Invalid category ID format');
    }

    if (props.userId && this.isInvalidId(props.userId)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.type) {
      throw new Error('Category type is required');
    }

    if (!props.name) {
      throw new Error('Category name is required');
    }

    if (this.isEmpty(props.name)) {
      throw new Error('Category name cannot be empty');
    }

    if (!props.icon) {
      throw new Error('Category icon is required');
    }

    if (this.isEmpty(props.icon)) {
      throw new Error('Category icon cannot be empty');
    }
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

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Category name is required');
    }

    if (Category.isEmpty(newName)) {
      throw new Error('Category name cannot be empty');
    }

    if (this.name !== newName) {
      this.name = newName;
      this.touch();
    }
  }

  updateIcon(newIcon: string): void {
    if (!newIcon) {
      throw new Error('Category icon is required');
    }

    if (Category.isEmpty(newIcon)) {
      throw new Error('Category icon cannot be empty');
    }

    if (this.icon !== newIcon) {
      this.icon = newIcon;
      this.touch();
    }
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  isAccessibleByUser(userId: string): boolean {
    return !!this.userId === null || !!this.belongsToUser(userId);
  }

  hasUser(): boolean {
    return !!this.userId;
  }
}
