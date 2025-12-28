import { Injectable } from '@nestjs/common';
import { SubcategoryRepository } from 'src/domain/repositories/subcategory.repository.interface';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { UseCase } from '../../usecase';
import { UpdateTransactionUseCaseInput } from './input';
import { UpdateTransactionUseCaseOutput } from './output';

@Injectable()
export class UpdateTransactionUseCase
  implements
    UseCase<
      UpdateTransactionUseCaseInput,
      Promise<UpdateTransactionUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
    @InjectRepository('BANK_ACCOUNTS')
    private readonly bankAccountRepository: BankAccountRepository,
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository('SUBCATEGORIES')
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async execute(
    input: UpdateTransactionUseCaseInput,
  ): Promise<UpdateTransactionUseCaseOutput> {
    const {
      transactionId,
      userId,
      name,
      value,
      date,
      bankAccountId,
      categoryId,
      subcategoryId,
    } = input;

    const transaction = await this.transactionRepository.findById(
      transactionId,
    );

    if (!transaction) {
      throw ResourceNotFoundException.transaction(transactionId);
    }

    if (!transaction.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership('transação');
    }

    if (bankAccountId !== transaction.getBankAccountId()) {
      const bankAccount = await this.bankAccountRepository.findById(
        bankAccountId,
      );

      if (!bankAccount) {
        throw ResourceNotFoundException.bankAccount(bankAccountId);
      }

      if (!bankAccount.belongsToUser(userId)) {
        throw ForbiddenException.invalidOwnership('conta bancária');
      }

      transaction.updateBankAccount(bankAccountId);
    }

    if (categoryId !== transaction.getCategoryId()) {
      const category = await this.categoryRepository.findById(categoryId);

      if (!category) {
        throw ResourceNotFoundException.category(categoryId);
      }

      if (!category.isAccessibleByUser(userId)) {
        throw ForbiddenException.invalidOwnership('categoria');
      }

      transaction.assignCategory(categoryId);
    }

    if (subcategoryId !== transaction.getSubcategoryId()) {
      const subcategory = await this.subcategoryRepository.findById(
        subcategoryId,
      );

      if (!subcategory) {
        throw ResourceNotFoundException.subcategory(subcategoryId);
      }

      if (!subcategory.belongsToCategory(categoryId)) {
        throw ForbiddenException.invalidOwnership('subcategoria');
      }

      transaction.assignSubcategory(subcategoryId);
    }

    transaction.updateName(name);
    transaction.updateValue(value);
    transaction.updateDate(date);

    await this.transactionRepository.update(transaction);

    return {
      id: transaction.getId(),
      userId: transaction.getUserId(),
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subcategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue(),
      date: transaction.getDate(),
      type: transaction.getType(),
    };
  }
}
