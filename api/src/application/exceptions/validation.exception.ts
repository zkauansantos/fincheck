import {
  BaseException,
  BaseExceptionProps,
} from '../../shared/exceptions/base.exception';
import { ValidationErrorCode } from '../../shared/exceptions/error-codes.enum';

type ValidationExceptionProps = Omit<BaseExceptionProps, 'statusCode'>;

export class ValidationException extends BaseException {
  private constructor(props: ValidationExceptionProps) {
    super({ ...props, statusCode: 400 });
  }

  static invalidEmail(email: string): ValidationException {
    return new ValidationException({
      message: `Formato de email inválido: ${email}`,
      code: ValidationErrorCode.INVALID_EMAIL,
      internalMessage: `Invalid email format: ${email}`,
    });
  }

  static invalidUUID(field: string): ValidationException {
    return new ValidationException({
      message: `Formato de UUID inválido para ${field}`,
      code: ValidationErrorCode.INVALID_UUID,
      internalMessage: `Invalid UUID format for field "${field}".`,
    });
  }

  static requiredField(field: string): ValidationException {
    return new ValidationException({
      message: `${field} é obrigatório`,
      code: ValidationErrorCode.REQUIRED_FIELD,
      internalMessage: `The field "${field}" is required.`,
    });
  }

  static minLength(field: string, minLength: number): ValidationException {
    return new ValidationException({
      message: `${field} deve ter no mínimo ${minLength} caracteres`,
      code: ValidationErrorCode.MIN_LENGTH,
      internalMessage: `The field "${field}" must have at least ${minLength} characters.`,
    });
  }

  static maxLength(field: string, maxLength: number): ValidationException {
    return new ValidationException({
      message: `${field} deve ter no máximo ${maxLength} caracteres`,
      code: ValidationErrorCode.MAX_LENGTH,
      internalMessage: `The field "${field}" must have at most ${maxLength} characters.`,
    });
  }

  static invalidDate(field: string): ValidationException {
    return new ValidationException({
      message: `Formato de data inválido para ${field}`,
      code: ValidationErrorCode.INVALID_DATE,
      internalMessage: `Invalid Date ${field}.`,
    });
  }

  static negativeValue(field: string): ValidationException {
    return new ValidationException({
      message: `${field} não pode ser negativo`,
      code: ValidationErrorCode.NEGATIVE_VALUE,
      internalMessage: `The field "${field}" cannot be negative.`,
    });
  }

  static emailAlreadyExists(email: string): ValidationException {
    return new ValidationException({
      message: `O email '${email}' já está cadastrado`,
      code: ValidationErrorCode.EMAIL_ALREADY_EXISTS,
      internalMessage: `The email "${email}" is already in use.`,
    });
  }
}
