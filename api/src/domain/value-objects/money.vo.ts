export class Money {
  private readonly amount: number;

  private constructor(amount: number) {
    this.amount = amount;
  }

  static create(amount: number): Money {
    this.validate(amount);
    return new Money(this.roundToTwoDecimals(amount));
  }

  static zero(): Money {
    return new Money(0);
  }

  private static validate(amount: number): void {
    if (amount === null || amount === undefined) {
      throw new Error('Amount is required');
    }

    if (this.isNotANumber(amount)) {
      throw new Error('Amount must be a valid number');
    }

    if (this.isNegative(amount)) {
      throw new Error('Amount cannot be negative');
    }

    if (this.exceedsMaxValue(amount)) {
      throw new Error('Amount exceeds maximum allowed value');
    }
  }

  private static isNotANumber(amount: number): boolean {
    return isNaN(amount) || !isFinite(amount);
  }

  private static isNegative(amount: number): boolean {
    return amount < 0;
  }

  private static exceedsMaxValue(amount: number): boolean {
    return amount > Number.MAX_SAFE_INTEGER;
  }

  private static roundToTwoDecimals(amount: number): number {
    return Math.round(amount * 100) / 100;
  }

  getValue(): number {
    return this.amount;
  }

  add(other: Money): Money {
    return Money.create(this.amount + other.amount);
  }

  subtract(other: Money): Money {
    const result = this.amount - other.amount;
    if (result < 0) {
      throw new Error('Result cannot be negative');
    }
    return Money.create(result);
  }

  isGreaterThan(other: Money): boolean {
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    return this.amount < other.amount;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  toString(): string {
    return this.amount.toFixed(2);
  }
}
