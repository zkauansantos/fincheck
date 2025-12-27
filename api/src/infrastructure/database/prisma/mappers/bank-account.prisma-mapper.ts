import { BankAccount as PrismaBankAccount } from '@prisma/client';
import { BankAccount } from '../../../../domain/entities/bank-account.entity';
import { BankAccountType } from '../../../../domain/enums/bank-account-type.enum';
import { Money } from '../../../../domain/value-objects/money.vo';

export class BankAccountPrismaMapper {
  static toDomain(prismaBankAccount: PrismaBankAccount): BankAccount {
    return BankAccount.reconstitute({
      id: prismaBankAccount.id,
      userId: prismaBankAccount.userId,
      name: prismaBankAccount.name,
      initialBalance: Money.create(prismaBankAccount.initialBalance),
      type: prismaBankAccount.type as BankAccountType,
      color: prismaBankAccount.color,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toPrisma(bankAccount: BankAccount): PrismaBankAccount {
    return {
      id: bankAccount.getId(),
      userId: bankAccount.getUserId(),
      name: bankAccount.getName(),
      initialBalance: bankAccount.getInitialBalance().getValue(),
      type: bankAccount.getType(),
      color: bankAccount.getColor(),
    };
  }

  static toPrismaCreate(bankAccount: BankAccount) {
    return {
      id: bankAccount.getId(),
      userId: bankAccount.getUserId(),
      name: bankAccount.getName(),
      initialBalance: bankAccount.getInitialBalance().getValue(),
      type: bankAccount.getType(),
      color: bankAccount.getColor(),
    };
  }

  static toPrismaUpdate(bankAccount: BankAccount) {
    return {
      name: bankAccount.getName(),
      initialBalance: bankAccount.getInitialBalance().getValue(),
      color: bankAccount.getColor(),
    };
  }
}
