import { TransactionType } from '../enums/transaction-type.enum';
import { CategoryInfo } from '../value-objects/category-info.vo';
import { Money } from '../value-objects/money.vo';

export interface TransactionProps {
  id: string;
  userId: string;
  bankAccountId: string;
  categoryId: string | null;
  subcategoryId: string | null;
  name: string;
  value: Money;
  date: Date;
  type: TransactionType;
  categoryInfo?: CategoryInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction {
  private readonly id: string;
  private readonly userId: string;
  private bankAccountId: string;
  private categoryId: string | null;
  private subcategoryId: string | null;
  private name: string;
  private value: Money;
  private date: Date;
  private readonly type: TransactionType;
  private readonly categoryInfo?: CategoryInfo;
  private readonly createdAt: Date;
  private updatedAt: Date;

  private constructor(props: TransactionProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.bankAccountId = props.bankAccountId;
    this.categoryId = props.categoryId;
    this.subcategoryId = props.subcategoryId;
    this.name = props.name;
    this.value = props.value;
    this.date = props.date;
    this.type = props.type;
    this.categoryInfo = props.categoryInfo;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static create(props: TransactionProps): Transaction {
    this.validateProps(props);
    return new Transaction(props);
  }

  static createIncome(
    id: string,
    userId: string,
    bankAccountId: string,
    name: string,
    value: number,
    date: Date,
    categoryId?: string,
    subcategoryId?: string,
  ): Transaction {
    return this.create({
      id,
      userId,
      bankAccountId,
      categoryId: categoryId || null,
      subcategoryId: subcategoryId || null,
      name,
      value: Money.create(value),
      date,
      type: TransactionType.INCOME,
    });
  }

  static createExpense(
    id: string,
    userId: string,
    bankAccountId: string,
    name: string,
    value: number,
    date: Date,
    categoryId?: string,
    subcategoryId?: string,
  ): Transaction {
    return this.create({
      id,
      userId,
      bankAccountId,
      categoryId: categoryId || null,
      subcategoryId: subcategoryId || null,
      name,
      value: Money.create(value),
      date,
      type: TransactionType.EXPENSE,
    });
  }

  static reconstitute(props: TransactionProps): Transaction {
    return new Transaction(props);
  }

  private static validateProps(props: TransactionProps): void {
    if (!props.id) {
      throw new Error('Transaction ID is required');
    }

    if (this.isInvalidId(props.id)) {
      throw new Error('Invalid transaction ID format');
    }

    if (!props.userId) {
      throw new Error('User ID is required');
    }

    if (this.isInvalidId(props.userId)) {
      throw new Error('Invalid user ID format');
    }

    if (!props.bankAccountId) {
      throw new Error('Bank account ID is required');
    }

    if (this.isInvalidId(props.bankAccountId)) {
      throw new Error('Invalid bank account ID format');
    }

    if (props.categoryId && this.isInvalidId(props.categoryId)) {
      throw new Error('Invalid category ID format');
    }

    if (props.subcategoryId && this.isInvalidId(props.subcategoryId)) {
      throw new Error('Invalid subcategory ID format');
    }

    if (!props.name) {
      throw new Error('Transaction name is required');
    }

    if (this.isNameEmpty(props.name)) {
      throw new Error('Transaction name cannot be empty');
    }

    if (this.isNameTooShort(props.name)) {
      throw new Error('Transaction name must be at least 2 characters long');
    }

    if (this.isNameTooLong(props.name)) {
      throw new Error('Transaction name is too long (max 100 characters)');
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
    return name.length > 100;
  }

  private static isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getBankAccountId(): string {
    return this.bankAccountId;
  }

  getCategoryId(): string | null {
    return this.categoryId;
  }

  getSubcategoryId(): string | null {
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

  getCreatedAt(): Date {
    return new Date(this.createdAt);
  }

  getUpdatedAt(): Date {
    return new Date(this.updatedAt);
  }

  getCategoryName() {
    return this.categoryInfo.getName();
  }

  getCategoryIcon() {
    return this.categoryInfo.getIcon();
  }

  updateName(newName: string): void {
    if (!newName) {
      throw new Error('Transaction name is required');
    }

    if (Transaction.isNameEmpty(newName)) {
      throw new Error('Transaction name cannot be empty');
    }

    if (Transaction.isNameTooShort(newName)) {
      throw new Error('Transaction name must be at least 2 characters long');
    }

    if (Transaction.isNameTooLong(newName)) {
      throw new Error('Transaction name is too long (max 100 characters)');
    }

    this.name = newName;
    this.touch();
  }

  updateValue(newValue: number): void {
    this.value = Money.create(newValue);
    this.touch();
  }

  updateDate(newDate: Date): void {
    if (!newDate) {
      throw new Error('Transaction date is required');
    }

    if (Transaction.isInvalidDate(newDate)) {
      throw new Error('Invalid transaction date');
    }

    this.date = newDate;
    this.touch();
  }

  updateBankAccount(bankAccountId: string): void {
    if (!bankAccountId) {
      throw new Error('Bank account ID is required');
    }

    if (Transaction.isInvalidId(bankAccountId)) {
      throw new Error('Invalid bank account ID format');
    }

    this.bankAccountId = bankAccountId;
    this.touch();
  }

  assignCategory(categoryId: string): void {
    if (Transaction.isInvalidId(categoryId)) {
      throw new Error('Invalid category ID format');
    }

    this.categoryId = categoryId;
    this.touch();
  }

  removeCategory(): void {
    this.categoryId = null;
    this.subcategoryId = null;
    this.touch();
  }

  assignSubcategory(subcategoryId: string): void {
    if (!this.categoryId) {
      throw new Error('Cannot assign subcategory without a category');
    }

    if (Transaction.isInvalidId(subcategoryId)) {
      throw new Error('Invalid subcategory ID format');
    }

    this.subcategoryId = subcategoryId;
    this.touch();
  }

  removeSubcategory(): void {
    this.subcategoryId = null;
    this.touch();
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

  hasCategory(): boolean {
    return this.categoryId !== null;
  }

  hasSubcategory(): boolean {
    return this.subcategoryId !== null;
  }

  isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }

  isInMonth(year: number, month: number): boolean {
    const transactionYear = this.date.getFullYear();
    const transactionMonth = this.date.getMonth() + 1;
    return transactionYear === year && transactionMonth === month;
  }

  isInYear(year: number): boolean {
    return this.date.getFullYear() === year;
  }

  isAfter(date: Date): boolean {
    return this.date.getTime() > date.getTime();
  }

  isBefore(date: Date): boolean {
    return this.date.getTime() < date.getTime();
  }

  isBetween(startDate: Date, endDate: Date): boolean {
    const timestamp = this.date.getTime();
    return timestamp >= startDate.getTime() && timestamp <= endDate.getTime();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }
}
