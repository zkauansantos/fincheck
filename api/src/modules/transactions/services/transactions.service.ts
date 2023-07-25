import { Injectable } from '@nestjs/common';
import { ValidateBankAccountOwnerService } from '../../bank-accounts/services/validate-bank-account-owner.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.respositories';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateCategoryOwnerService } from '../../categories/services/validate-category-owner.service';
import { ValidateTransactionOwnerService } from './validate-transaction-owner.service';
import { TransactionType } from '../entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnerService: ValidateBankAccountOwnerService,
    private readonly validateCategoryOwnerService: ValidateCategoryOwnerService,
    private readonly validateTransactionOwnerService: ValidateTransactionOwnerService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId } = createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    });

    const { name, value, date, type } = createTransactionDto;

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        value,
        date,
        type,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { categoryId, bankAccountId } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      categoryId,
      bankAccountId,
      transactionId,
    });

    const { name, type, date, value } = updateTransactionDto;

    return this.transactionsRepository.update({
      where: { id: transactionId },
      data: {
        categoryId,
        bankAccountId,
        name,
        date,
        value,
        type,
      },
    });
  }

  async delete(userId: string, transactionId: string) {
    await this.validateTransactionOwnerService.validate(transactionId, userId);

    return this.transactionsRepository.delete({
      where: { id: transactionId },
    });
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId: string;
    categoryId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnerService.validate(transactionId, userId),
      this.validateBankAccountOwnerService.validate(bankAccountId, userId),
      this.validateCategoryOwnerService.validate(categoryId, userId),
    ]);
  }
}
