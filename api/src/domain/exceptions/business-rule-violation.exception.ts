import { BusinessRuleErrorCode } from '../../shared/exceptions/error-codes.enum';
import { DomainException, DomainExceptionProps } from './domain.exception';

export class BusinessRuleViolationException extends DomainException {
  private constructor(props: DomainExceptionProps) {
    super(props);
  }

  static subcategoryRequiresCategory(): BusinessRuleViolationException {
    return new BusinessRuleViolationException({
      message: 'Não é possível atribuir subcategoria sem uma categoria',
      code: BusinessRuleErrorCode.SUBCATEGORY_REQUIRES_CATEGORY,
    });
  }

  static categoryTypeMismatch(): BusinessRuleViolationException {
    return new BusinessRuleViolationException({
      message: 'O tipo da transação não corresponde ao tipo da categoria',
      code: BusinessRuleErrorCode.CATEGORY_TYPE_MISMATCH,
    });
  }

  static cannotDeleteCategoryWithTransactions(): BusinessRuleViolationException {
    return new BusinessRuleViolationException({
      message:
        'Não é possível deletar categoria que possui transações associadas',
      code: BusinessRuleErrorCode.CANNOT_DELETE_CATEGORY_WITH_TRANSACTIONS,
    });
  }

  static cannotDeleteBankAccountWithTransactions(): BusinessRuleViolationException {
    return new BusinessRuleViolationException({
      message:
        'Não é possível deletar conta bancária que possui transações associadas',
      code: BusinessRuleErrorCode.CANNOT_DELETE_BANK_ACCOUNT_WITH_TRANSACTIONS,
    });
  }
}
