import { hash, compare } from 'bcryptjs';

export class Password {
  private readonly value: string;
  private readonly isHashed: boolean;

  private constructor(password: string, isHashed: boolean) {
    this.value = password;
    this.isHashed = isHashed;
  }

  static create(plainPassword: string): Password {
    this.validate(plainPassword);
    return new Password(plainPassword, false);
  }

  static createHashed(hashedPassword: string): Password {
    if (!hashedPassword) {
      throw new Error('Hashed password is required');
    }
    return new Password(hashedPassword, true);
  }

  static async createFromPlain(plainPassword: string): Promise<Password> {
    this.validate(plainPassword);
    const hashedValue = await hash(plainPassword, 12);
    return new Password(hashedValue, true);
  }

  private static validate(password: string): void {
    if (!password) {
      throw new Error('Password is required');
    }

    if (this.isTooShort(password)) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (this.isTooLong(password)) {
      throw new Error('Password is too long (max 100 characters)');
    }
  }

  private static isTooShort(password: string): boolean {
    return password.length < 8;
  }

  private static isTooLong(password: string): boolean {
    return password.length > 100;
  }

  async hash(): Promise<Password> {
    if (this.isHashed) {
      return this;
    }

    const hashedValue = await hash(this.value, 12);
    return new Password(hashedValue, true);
  }

  async compareWith(plainPassword: string): Promise<boolean> {
    if (!this.isHashed) {
      throw new Error('Cannot compare with a non-hashed password');
    }

    return compare(plainPassword, this.value);
  }

  getValue(): string {
    return this.value;
  }

  getIsHashed(): boolean {
    return this.isHashed;
  }

  toString(): string {
    return '********';
  }
}
