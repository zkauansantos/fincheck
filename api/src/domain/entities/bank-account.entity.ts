import { BankAccountType } from '../enums/bank-account-type.enum';
import { Money } from '../value-objects/money.vo';

export interface BankAccountProps {
  id: string;
  userId: string;
  name: string;
  initialBalance: Money;
  type: BankAccountType;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BankAccount {
  private readonly id: string;
  private readonly userId: string;
  private name: string;
  private initialBalance: Money;
  private readonly type: BankAccountType;
  private color: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: BankAccountProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.initialBalance = props.initialBalance;
    this.type = props.type;
    this.color = props.color;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: BankAccountProps): BankAccount {
    this.validateProps(props);
    return new BankAccount(props);
  }

  static reconstitute(props: BankAccountProps): BankAccount {
    return new BankAccount(props);
  }

  private static validateProps(props: BankAccountProps): void {
    if (!props.id) {
      throw new Error('Bank account ID is required');
    }

    if (this.isInvalidId(props.id)) {
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

    if (this.isNameEmpty(props.name)) {
      throw new Error('Bank account name cannot be empty');
    }

    if (this.isNameTooShort(props.name)) {
      throw new Error('Bank account name must be at least 2 characters long');
    }

    if (this.isNameTooLong(props.name)) {
      throw new Error('Bank account name is too long (max 50 characters)');
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

  private static isInvalidColor(color: string): boolean {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return !hexColorRegex.test(color);
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getInitialBalance(): Money {
    return this.initialBalance;
  }

  getType(): BankAccountType {
    return this.type;
  }

  getColor(): string {
    return this.color;
  }

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Bank account name is required');
    }

    if (BankAccount.isNameEmpty(newName)) {
      throw new Error('Bank account name cannot be empty');
    }

    if (BankAccount.isNameTooShort(newName)) {
      throw new Error('Bank account name must be at least 2 characters long');
    }

    if (BankAccount.isNameTooLong(newName)) {
      throw new Error('Bank account name is too long (max 50 characters)');
    }

    this.name = newName;
    this.touch();
  }

  updateInitialBalance(newBalance: number): void {
    this.initialBalance = Money.create(newBalance);
    this.touch();
  }

  updateColor(newColor: string): void {
    if (!newColor) {
      throw new Error('Bank account color is required');
    }

    if (BankAccount.isInvalidColor(newColor)) {
      throw new Error('Invalid color format (must be hex color)');
    }

    this.color = newColor;
    this.touch();
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  isChecking(): boolean {
    return this.type === BankAccountType.CHECKING;
  }

  isCash(): boolean {
    return this.type === BankAccountType.CASH;
  }

  isInvestment(): boolean {
    return this.type === BankAccountType.INVESTMENT;
  }

  calculateCurrentBalance(incomeSum: number, expenseSum: number): number {
    return this.initialBalance.getValue() + incomeSum - expenseSum;
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
