import {
  BaseException,
  BaseExceptionProps,
} from '../../shared/exceptions/base.exception';
import { ResourceNotFoundErrorCode } from '../../shared/exceptions/error-codes.enum';

export class ResourceNotFoundException extends BaseException {
  private constructor(props: Omit<BaseExceptionProps, 'statusCode'>) {
    super({ ...props, statusCode: 404 });
  }

  private static create(
    resourceName: string,
    identifier?: string,
  ): ResourceNotFoundException {
    const message = identifier
      ? `${resourceName} com identificador '${identifier}' não encontrado(a)`
      : `${resourceName} não encontrado(a)`;

    return new ResourceNotFoundException({
      message,
      code: ResourceNotFoundErrorCode.RESOURCE_NOT_FOUND,
      internalMessage: identifier
        ? `${resourceName} with identifier '${identifier}' not found.`
        : `${resourceName} not found.`,
    });
  }

  static user(userId?: string): ResourceNotFoundException {
    return this.create('Usuário', userId);
  }

  static category(categoryId?: string): ResourceNotFoundException {
    return this.create('Categoria', categoryId);
  }

  static transaction(transactionId?: string): ResourceNotFoundException {
    return this.create('Transação', transactionId);
  }

  static bankAccount(bankAccountId?: string): ResourceNotFoundException {
    return this.create('Conta bancária', bankAccountId);
  }

  static subcategory(subcategoryId?: string): ResourceNotFoundException {
    return this.create('Subcategoria', subcategoryId);
  }
}
