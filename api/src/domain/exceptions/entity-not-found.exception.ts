import { DomainException } from './domain.exception';

export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, identifier?: string) {
    const message = identifier
      ? `${entityName} with identifier '${identifier}' not found`
      : `${entityName} not found`;
    super(message);
  }

  static user(userId: string): EntityNotFoundException {
    return new EntityNotFoundException('User', userId);
  }

  static bankAccount(bankAccountId: string): EntityNotFoundException {
    return new EntityNotFoundException('Bank Account', bankAccountId);
  }

  static transaction(transactionId: string): EntityNotFoundException {
    return new EntityNotFoundException('Transaction', transactionId);
  }

  static category(categoryId: string): EntityNotFoundException {
    return new EntityNotFoundException('Category', categoryId);
  }

  static subcategory(subcategoryId: string): EntityNotFoundException {
    return new EntityNotFoundException('Subcategory', subcategoryId);
  }
}
