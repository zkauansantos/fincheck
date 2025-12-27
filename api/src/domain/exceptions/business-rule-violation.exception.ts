import { DomainException } from './domain.exception';

export class BusinessRuleViolationException extends DomainException {
  constructor(message: string) {
    super(message);
  }

  static subcategoryRequiresCategory(): BusinessRuleViolationException {
    return new BusinessRuleViolationException(
      'Cannot assign subcategory without a category',
    );
  }

  static categoryTypeMismatch(): BusinessRuleViolationException {
    return new BusinessRuleViolationException(
      'Transaction type does not match category type',
    );
  }

  static cannotDeleteCategoryWithTransactions(): BusinessRuleViolationException {
    return new BusinessRuleViolationException(
      'Cannot delete category that has associated transactions',
    );
  }

  static cannotDeleteBankAccountWithTransactions(): BusinessRuleViolationException {
    return new BusinessRuleViolationException(
      'Cannot delete bank account that has associated transactions',
    );
  }
}
