export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class TransactionTypeValidator {
  static isValid(type: string): boolean {
    return Object.values(TransactionType).includes(type as TransactionType);
  }

  static validate(type: string): void {
    if (!this.isValid(type)) {
      throw new Error(
        `Invalid transaction type: ${type}. Must be INCOME or EXPENSE.`,
      );
    }
  }

  static isIncome(type: TransactionType): boolean {
    return type === TransactionType.INCOME;
  }

  static isExpense(type: TransactionType): boolean {
    return type === TransactionType.EXPENSE;
  }
}
