import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
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
      throw EntityNotFoundException.transaction(transactionId);
    }

    if (!transaction.belongsToUser(userId)) {
      throw InvalidOwnershipException.transaction(transactionId);
    }

    // Update name if provided
    if (name !== undefined) {
      transaction.updateName(name);
    }

    // Update value if provided
    if (value !== undefined) {
      transaction.updateValue(value);
    }

    // Update date if provided
    if (date !== undefined) {
      transaction.updateDate(date);
    }

    // Update bank account if provided
    if (bankAccountId !== undefined) {
      const bankAccount = await this.bankAccountRepository.findById(
        bankAccountId,
      );

      if (!bankAccount) {
        throw EntityNotFoundException.bankAccount(bankAccountId);
      }

      if (!bankAccount.belongsToUser(userId)) {
        throw InvalidOwnershipException.bankAccount(bankAccountId);
      }

      transaction.updateBankAccount(bankAccountId);
    }

    // Update category if provided
    if (categoryId !== undefined) {
      if (categoryId === null || categoryId === '') {
        transaction.removeCategory();
      } else {
        const category = await this.categoryRepository.findById(categoryId);

        if (!category) {
          throw EntityNotFoundException.category(categoryId);
        }

        if (!category.belongsToUser(userId)) {
          throw InvalidOwnershipException.category(categoryId);
        }

        transaction.assignCategory(categoryId);
      }
    }

    // Update subcategory if provided
    if (subcategoryId !== undefined) {
      if (subcategoryId === null || subcategoryId === '') {
        transaction.removeSubcategory();
      } else {
        transaction.assignSubcategory(subcategoryId);
      }
    }

    await this.transactionRepository.update(transaction);

    return {
      id: transaction.getId(),
      userId: transaction.getUserId(),
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subcategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue().getValue(),
      date: transaction.getDate(),
      type: transaction.getType(),
    };
  }
}
