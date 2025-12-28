export class Email {
  private readonly value: string;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Email {
    this.validate(email);
    return new Email(email.toLowerCase().trim());
  }

  private static validate(email: string): void {
    if (!email) {
      throw new Error('Email is required');
    }

    if (this.isEmpty(email)) {
      throw new Error('Email cannot be empty');
    }

    if (!this.hasValidFormat(email)) {
      throw new Error('Invalid email format');
    }

    if (this.exceedsMaxLength(email)) {
      throw new Error('Email is too long (max 255 characters)');
    }
  }

  private static isEmpty(email: string): boolean {
    return email.trim().length === 0;
  }

  private static hasValidFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static exceedsMaxLength(email: string): boolean {
    return email.length > 255;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
