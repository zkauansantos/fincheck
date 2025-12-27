import { DomainException } from './domain.exception';

export class InvalidOwnershipException extends DomainException {
  constructor(entityName: string, entityId?: string) {
    const message = entityId
      ? `You don't have permission to access this ${entityName} (${entityId})`
      : `You don't have permission to access this ${entityName}`;
    super(message);
  }

  static bankAccount(bankAccountId: string): InvalidOwnershipException {
    return new InvalidOwnershipException('bank account', bankAccountId);
  }

  static transaction(transactionId: string): InvalidOwnershipException {
    return new InvalidOwnershipException('transaction', transactionId);
  }

  static category(categoryId: string): InvalidOwnershipException {
    return new InvalidOwnershipException('category', categoryId);
  }
}
