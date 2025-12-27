import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.respositories';
import { ValidateBankAccountOwnerService } from '../../bank-accounts/services/validate-bank-account-owner.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionType } from '../entities/Transaction';
import { ValidateTransactionOwnerService } from './validate-transaction-owner.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnerService: ValidateBankAccountOwnerService,
    private readonly validateTransactionOwnerService: ValidateTransactionOwnerService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId } = createTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
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
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  findAllByYear(
    userId: string,
    filters: {
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
          gte: new Date(Date.UTC(filters.year, 0)),
          lt: new Date(Date.UTC(filters.year + 1, 0)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async getCategoryAnalytics(
    userId: string,
    filters: {
      year: number;
      bankAccountId?: string;
    },
  ) {
    const transactions = await this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        date: {
          gte: new Date(Date.UTC(filters.year, 0)),
          lt: new Date(Date.UTC(filters.year + 1, 0)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });

    const categoryMap = new Map();

    transactions.forEach((transaction: any) => {
      const categoryId = transaction.categoryId;
      const categoryName = transaction.category?.name || 'Sem categoria';
      const categoryIcon = transaction.category?.icon || '';
      const month = new Date(transaction.date).getMonth();
      const isIncome = transaction.type === 'INCOME';

      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          categoryId,
          categoryName,
          categoryIcon,
          months: Array(12).fill(0),
          totalIncome: 0,
          totalExpense: 0,
          averageIncome: 0,
          averageExpense: 0,
        });
      }

      const category = categoryMap.get(categoryId);

      category.months[month] += transaction.value;

      if (isIncome) {
        category.totalIncome += transaction.value;
        return;
      }

      category.totalExpense += transaction.value;
    });

    const result = Array.from(categoryMap.values()).map((category) => {
      const monthsWithIncome = category.totalIncome > 0 ? 12 : 0;
      const monthsWithExpense = category.totalExpense > 0 ? 12 : 0;

      return {
        ...category,
        averageIncome: monthsWithIncome > 0 ? category.totalIncome / 12 : 0,
        averageExpense: monthsWithExpense > 0 ? category.totalExpense / 12 : 0,
      };
    });

    return result;
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { categoryId, bankAccountId } = updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
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
    transactionId,
  }: {
    userId: string;
    bankAccountId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnerService.validate(transactionId, userId),
      this.validateBankAccountOwnerService.validate(bankAccountId, userId),
    ]);
  }
}
