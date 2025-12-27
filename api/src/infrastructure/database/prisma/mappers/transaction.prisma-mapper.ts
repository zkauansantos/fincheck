import { Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction } from '../../../../domain/entities/transaction.entity';
import { TransactionType } from '../../../../domain/enums/transaction-type.enum';
import { Money } from '../../../../domain/value-objects/money.vo';

export class TransactionPrismaMapper {
  static toDomain(prismaTransaction: PrismaTransaction): Transaction {
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
      value: transaction.getValue().getValue(),
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
      value: transaction.getValue().getValue(),
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
      value: transaction.getValue().getValue(),
      date: transaction.getDate(),
    };
  }
}
