import { TransactionType } from '../enums/transaction-type.enum';
import { CategoryInfo } from '../value-objects/category-info.vo';
import { Money } from '../value-objects/money.vo';
import { Entity } from './entity';

export interface TransactionProps {
  id?: string;
  userId: string;
  bankAccountId: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
  categoryInfo?: CategoryInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction extends Entity {
  private readonly userId: string;
  private bankAccountId: string;
  private categoryId: string;
  private subcategoryId: string;
  private name: string;
  private value: Money;
  private date: Date;
  private readonly type: TransactionType;
  private readonly categoryInfo?: CategoryInfo;

  private constructor(props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt);

    this.userId = props.userId;
    this.bankAccountId = props.bankAccountId;
    this.categoryId = props.categoryId;
    this.subcategoryId = props.subcategoryId;
    this.name = props.name;
    this.value = Money.create(props.value);
    this.date = props.date;
    this.type = props.type;
    this.categoryInfo = props.categoryInfo;
  }

  static create(props: TransactionProps): Transaction {
    this.validateProps(props);
    return new Transaction(props);
  }

  static reconstitute(props: TransactionProps): Transaction {
    return new Transaction(props);
  }

  private static validateProps(props: TransactionProps): void {
    if (props.id && this.isInvalidId(props.id)) {
      throw new Error('Invalid transaction ID format');
    }

    if (!props.userId) {
      throw new Error('User ID is required');
    }

    if (!props.bankAccountId) {
      throw new Error('Bank account ID is required');
    }
    if (!props.categoryId) throw new Error('Category ID is required');

    if (!props.subcategoryId) throw new Error('Subcategory ID is required');

    if (this.isInvalidId(props.userId)) {
      throw new Error('Invalid user ID format');
    }

    if (this.isInvalidId(props.bankAccountId)) {
      throw new Error('Invalid bank account ID format');
    }

    if (this.isInvalidId(props.categoryId)) {
      throw new Error('Invalid category ID format');
    }

    if (this.isInvalidId(props.subcategoryId)) {
      throw new Error('Invalid subcategory ID format');
    }

    if (!props.name) {
      throw new Error('Transaction name is required');
    }

    if (this.isEmpty(props.name)) {
      throw new Error('Transaction name cannot be empty');
    }

    if (!props.value) {
      throw new Error('Transaction value is required');
    }

    if (!props.date) {
      throw new Error('Transaction date is required');
    }

    if (this.isInvalidDate(props.date)) {
      throw new Error('Invalid transaction date');
    }

    if (!props.type) {
      throw new Error('Transaction type is required');
    }
  }

  private static isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }

  getUserId(): string {
    return this.userId;
  }

  getBankAccountId(): string {
    return this.bankAccountId;
  }

  getCategoryId(): string {
    return this.categoryId;
  }

  getSubcategoryId(): string {
    return this.subcategoryId;
  }

  getName(): string {
    return this.name;
  }

  getValue(): number {
    return this.value.getValue();
  }

  getDate(): Date {
    return new Date(this.date);
  }

  getType(): TransactionType {
    return this.type;
  }

  getCategoryName(): string | null {
    return this.categoryInfo?.getName() ?? null;
  }

  getCategoryIcon(): string | null {
    return this.categoryInfo?.getIcon() ?? null;
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Transaction name is required');
    }

    if (Transaction.isEmpty(newName)) {
      throw new Error('Transaction name cannot be empty');
    }

    if (this.name !== newName) {
      this.name = newName;
      this.touch();
    }
  }

  updateValue(newValue: number): void {
    if (this.value.getValue() !== newValue) {
      this.value = Money.create(newValue);
      this.touch();
    }
  }

  updateDate(newDate: Date): void {
    if (!newDate) {
      throw new Error('Transaction date is required');
    }

    if (Transaction.isInvalidDate(newDate)) {
      throw new Error('Invalid transaction date');
    }

    if (this.date !== newDate) {
      this.date = newDate;
      this.touch();
    }
  }

  updateBankAccount(bankAccountId: string): void {
    if (!bankAccountId) {
      throw new Error('Bank account ID is required');
    }

    if (Transaction.isInvalidId(bankAccountId)) {
      throw new Error('Invalid bank account ID format');
    }

    if (this.bankAccountId !== bankAccountId) {
      this.bankAccountId = bankAccountId;
      this.touch();
    }
  }

  assignCategory(categoryId: string): void {
    if (Transaction.isInvalidId(categoryId)) {
      throw new Error('Invalid category ID format');
    }

    if (this.categoryId !== categoryId) {
      this.categoryId = categoryId;
      this.touch();
    }
  }

  assignSubcategory(subcategoryId: string): void {
    if (Transaction.isInvalidId(subcategoryId)) {
      throw new Error('Invalid subcategory ID format');
    }

    if (this.subcategoryId !== subcategoryId) {
      this.subcategoryId = subcategoryId;
      this.touch();
    }
  }

  belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  belongsToBankAccount(bankAccountId: string): boolean {
    return this.bankAccountId === bankAccountId;
  }

  belongsToCategory(categoryId: string): boolean {
    return this.categoryId === categoryId;
  }

  belongsToSubcategory(subcategoryId: string): boolean {
    return this.subcategoryId === subcategoryId;
  }
}
