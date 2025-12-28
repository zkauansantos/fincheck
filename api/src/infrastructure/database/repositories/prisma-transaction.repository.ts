import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import {
  TransactionFilters,
  TransactionRepository,
} from '../../../domain/repositories/transaction.repository.interface';
import { TransactionPrismaMapper } from '../prisma/mappers/transaction.prisma-mapper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return null;
    }

    return TransactionPrismaMapper.toDomain(transaction);
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!transaction) {
      return null;
    }

    return TransactionPrismaMapper.toDomain(transaction);
  }

  async findAll(filters: TransactionFilters): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: filters.userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      orderBy: { date: 'desc' },
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

    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async findByBankAccountId(bankAccountId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { bankAccountId },
      orderBy: { date: 'desc' },
    });

    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async findByCategoryId(categoryId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { categoryId },
      orderBy: { date: 'desc' },
    });

    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async findBySubcategoryId(subcategoryId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { subCategoryId: subcategoryId },
      orderBy: { date: 'desc' },
    });

    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async findByAnalytics({
    year,
    userId,
    bankAccountId,
  }: {
    userId: string;
    year: number;
    bankAccountId?: string;
  }): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        bankAccountId: bankAccountId,
        date: {
          gte: new Date(Date.UTC(year, 0)),
          lt: new Date(Date.UTC(year + 1, 0)),
        },
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
            icon: true,
            type: true,
          },
        },
      },
    });

    return transactions.map(TransactionPrismaMapper.toDomain);
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const data = TransactionPrismaMapper.toPrismaCreate(transaction);

    const prismaTransaction = await this.prisma.transaction.create({
      data,
    });

    return TransactionPrismaMapper.toDomain(prismaTransaction);
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const data = TransactionPrismaMapper.toPrismaUpdate(transaction);

    const prismaTransaction = await this.prisma.transaction.update({
      where: { id: transaction.getId() },
      data,
    });

    return TransactionPrismaMapper.toDomain(prismaTransaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return this.prisma.transaction.count({
      where: { userId },
    });
  }

  async countByBankAccountId(bankAccountId: string): Promise<number> {
    return this.prisma.transaction.count({
      where: { bankAccountId },
    });
  }

  async sumByBankAccountId(bankAccountId: string): Promise<number> {
    const result = await this.prisma.transaction.aggregate({
      where: { bankAccountId },
      _sum: { value: true },
    });

    return result._sum.value || 0;
  }

  async sumIncomeByBankAccountId(bankAccountId: string): Promise<number> {
    const result = await this.prisma.transaction.aggregate({
      where: {
        bankAccountId,
        type: TransactionType.INCOME,
      },
      _sum: { value: true },
    });

    return result._sum.value || 0;
  }

  async sumExpenseByBankAccountId(bankAccountId: string): Promise<number> {
    const result = await this.prisma.transaction.aggregate({
      where: {
        bankAccountId,
        type: TransactionType.EXPENSE,
      },
      _sum: { value: true },
    });

    return result._sum.value || 0;
  }
}
