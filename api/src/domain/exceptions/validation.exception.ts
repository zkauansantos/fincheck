import { DomainException } from './domain.exception';

export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message);
  }

  static invalidEmail(email: string): ValidationException {
    return new ValidationException(`Invalid email format: ${email}`);
  }

  static invalidUUID(field: string): ValidationException {
    return new ValidationException(`Invalid UUID format for ${field}`);
  }

  static requiredField(field: string): ValidationException {
    return new ValidationException(`${field} is required`);
  }

  static minLength(field: string, minLength: number): ValidationException {
    return new ValidationException(
      `${field} must be at least ${minLength} characters long`,
    );
  }

  static maxLength(field: string, maxLength: number): ValidationException {
    return new ValidationException(
      `${field} must be at most ${maxLength} characters long`,
    );
  }

  static invalidDate(field: string): ValidationException {
    return new ValidationException(`Invalid date format for ${field}`);
  }

  static negativeValue(field: string): ValidationException {
    return new ValidationException(`${field} cannot be negative`);
  }

  static emailAlreadyExists(email: string): ValidationException {
    return new ValidationException(`Email '${email}' is already registered`);
  }
}
