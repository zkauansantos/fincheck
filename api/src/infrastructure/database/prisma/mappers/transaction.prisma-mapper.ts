import { Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction } from '../../../../domain/entities/transaction.entity';
import { TransactionType } from '../../../../domain/enums/transaction-type.enum';
import { CategoryInfo } from '../../../../domain/value-objects/category-info.vo';
import { Money } from '../../../../domain/value-objects/money.vo';

type PrismaTransactionWithCategory = PrismaTransaction & {
  category?: {
    id: string;
    name: string;
    icon: string;
    type?: string;
  } | null;
};

export class TransactionPrismaMapper {
  static toDomain(
    prismaTransaction: PrismaTransactionWithCategory,
  ): Transaction {
    return Transaction.reconstitute({
      id: prismaTransaction.id,
      userId: prismaTransaction.userId,
      bankAccountId: prismaTransaction.bankAccountId,
      categoryId: prismaTransaction.categoryId,
      subcategoryId: prismaTransaction.subCategoryId,
      name: prismaTransaction.name,
      value: Money.create(prismaTransaction.value),
      date: prismaTransaction.date,
      type: prismaTransaction.type as TransactionType,
      categoryInfo: prismaTransaction.category
        ? CategoryInfo.create({
            id: prismaTransaction.category.id,
            name: prismaTransaction.category.name,
            icon: prismaTransaction.category.icon,
            type: prismaTransaction.category.type as TransactionType,
          })
        : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toPrisma(transaction: Transaction): PrismaTransaction {
    return {
      id: transaction.getId(),
      userId: transaction.getUserId(),
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subCategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue(),
      date: transaction.getDate(),
      type: transaction.getType(),
    };
  }

  static toPrismaCreate(transaction: Transaction) {
    return {
      id: transaction.getId(),
      userId: transaction.getUserId(),
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subCategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue(),
      date: transaction.getDate(),
      type: transaction.getType(),
    };
  }

  static toPrismaUpdate(transaction: Transaction) {
    return {
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subCategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue(),
      date: transaction.getDate(),
    };
  }
}
