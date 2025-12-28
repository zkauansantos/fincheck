import { BankAccountType } from '../enums/bank-account-type.enum';
import { Money } from '../value-objects/money.vo';
import { Entity } from './entity';

export interface BankAccountProps {
  id?: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankAccount extends Entity {
  private readonly userId: string;
  private name: string;
  private initialBalance: Money;
  private readonly type: BankAccountType;
  private color: string;

  private constructor(props: BankAccountProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.userId = props.userId;
    this.name = props.name;
    this.initialBalance = Money.create(props.initialBalance);
    this.type = props.type;
    this.color = props.color;
  }

  static create(props: BankAccountProps): BankAccount {
    this.validateProps(props);
    return new BankAccount(props);
  }

  static reconstitute(props: BankAccountProps): BankAccount {
    return new BankAccount(props);
  }

  private static validateProps(props: BankAccountProps): void {
    if (props.id && this.isInvalidId(props.id)) {
      throw new Error('Invalid bank account ID format');
    }

    if (!props.userId) {
      throw new Error('User ID is required');
    }

    if (this.isInvalidId(props.userId)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.name) {
      throw new Error('Bank account name is required');
    }

    if (this.isEmpty(props.name)) {
      throw new Error('Bank account name cannot be empty');
    }

    if (!props.initialBalance) {
      throw new Error('Initial balance is required');
    }

    if (!props.type) {
      throw new Error('Bank account type is required');
    }

    if (!props.color) {
      throw new Error('Bank account color is required');
    }

    if (this.isInvalidColor(props.color)) {
      throw new Error('Invalid color format (must be hex color)');
    }
  }

  private static isInvalidColor(color: string): boolean {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return !hexColorRegex.test(color);
  }

  getUserId(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getInitialBalance(): number {
    return this.initialBalance.getValue();
  }

  getType(): BankAccountType {
    return this.type;
  }

  getColor(): string {
    return this.color;
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Bank account name is required');
    }

    if (BankAccount.isEmpty(newName)) {
      throw new Error('Bank account name cannot be empty');
    }

    if (this.name !== newName) {
      this.name = newName;
      this.touch();
    }
  }

  updateInitialBalance(newBalance: number): void {
    if (this.getInitialBalance() !== newBalance) {
      this.initialBalance = Money.create(newBalance);
      this.touch();
    }
  }

  updateColor(newColor: string): void {
    if (!newColor) {
      throw new Error('Bank account color is required');
    }

    if (BankAccount.isInvalidColor(newColor)) {
      throw new Error('Invalid color format (must be hex color)');
    }

    if (this.color !== newColor) {
      this.color = newColor;
      this.touch();
    }
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }
}
