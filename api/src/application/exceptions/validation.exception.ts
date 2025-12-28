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
    });
  }

  static invalidUUID(field: string): ValidationException {
    return new ValidationException({
      message: `Formato de UUID inválido para ${field}`,
      code: ValidationErrorCode.INVALID_UUID,
    });
  }

  static requiredField(field: string): ValidationException {
    return new ValidationException({
      message: `${field} é obrigatório`,
      code: ValidationErrorCode.REQUIRED_FIELD,
    });
  }

  static minLength(field: string, minLength: number): ValidationException {
    return new ValidationException({
      message: `${field} deve ter no mínimo ${minLength} caracteres`,
      code: ValidationErrorCode.MIN_LENGTH,
    });
  }

  static maxLength(field: string, maxLength: number): ValidationException {
    return new ValidationException({
      message: `${field} deve ter no máximo ${maxLength} caracteres`,
      code: ValidationErrorCode.MAX_LENGTH,
    });
  }

  static invalidDate(field: string): ValidationException {
    return new ValidationException({
      message: `Formato de data inválido para ${field}`,
      code: ValidationErrorCode.INVALID_DATE,
    });
  }

  static negativeValue(field: string): ValidationException {
    return new ValidationException({
      message: `${field} não pode ser negativo`,
      code: ValidationErrorCode.NEGATIVE_VALUE,
    });
  }

  static emailAlreadyExists(email: string): ValidationException {
    return new ValidationException({
      message: `O email '${email}' já está cadastrado`,
      code: ValidationErrorCode.EMAIL_ALREADY_EXISTS,
    });
  }
}
