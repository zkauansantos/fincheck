import { TransactionType } from '../enums/transaction-type.enum';

export interface CategoryInfoProps {
  id: string;
  name: string;
  icon: string;
  type?: TransactionType;
}

export class CategoryInfo {
  private readonly id: string;
  private readonly name: string;
  private readonly icon: string;
  private readonly type?: TransactionType;

  private constructor(props: CategoryInfoProps) {
    this.id = props.id;
    this.name = props.name;
    this.icon = props.icon;
    this.type = props.type;
  }

  static create(props: CategoryInfoProps): CategoryInfo {
    this.validate(props);
    return new CategoryInfo(props);
  }

  private static validate(props: CategoryInfoProps): void {
    if (!props.id) {
      throw new Error('Category ID is required');
    }

    if (!props.name) {
      throw new Error('Category name is required');
    }

    if (!props.icon) {
      throw new Error('Category icon is required');
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getIcon(): string {
    return this.icon;
  }

  getType(): TransactionType | undefined {
    return this.type;
  }

  hasType(): boolean {
    return this.type !== undefined;
  }
}
