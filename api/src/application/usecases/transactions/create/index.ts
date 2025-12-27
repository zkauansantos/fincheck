import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Transaction } from '../../../../domain/entities/transaction.entity';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { Money } from '../../../../domain/value-objects/money.vo';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { CreateTransactionUseCaseInput } from './input';
import { CreateTransactionUseCaseOutput } from './output';

@Injectable()
export class CreateTransactionUseCase
  implements
    UseCase<
      CreateTransactionUseCaseInput,
      Promise<CreateTransactionUseCaseOutput>
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
    input: CreateTransactionUseCaseInput,
  ): Promise<CreateTransactionUseCaseOutput> {
    const {
      userId,
      bankAccountId,
      categoryId,
      subcategoryId,
      name,
      value,
      date,
      type,
    } = input;

    const bankAccount = await this.bankAccountRepository.findById(
      bankAccountId,
    );

    if (!bankAccount) {
      throw EntityNotFoundException.bankAccount(bankAccountId);
    }

    if (!bankAccount.belongsToUser(userId)) {
      throw InvalidOwnershipException.bankAccount(bankAccountId);
    }

    if (categoryId) {
      const category = await this.categoryRepository.findById(categoryId);

      if (!category) {
        throw EntityNotFoundException.category(categoryId);
      }

      if (!!category.getUserId() && !category.belongsToUser(userId)) {
        throw InvalidOwnershipException.category(categoryId);
      }
    }

    const transaction = Transaction.create({
      id: randomUUID(),
      userId,
      bankAccountId,
      categoryId,
      subcategoryId,
      name,
      value: Money.create(value),
      date,
      type,
    });

    await this.transactionRepository.save(transaction);

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
