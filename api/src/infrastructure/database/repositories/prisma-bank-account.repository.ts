import { Injectable } from '@nestjs/common';
import { BankAccount } from '../../../domain/entities/bank-account.entity';
import {
  BankAccountRepository,
  BankAccountWithBalance,
} from '../../../domain/repositories/bank-account.repository.interface';
import { BankAccountPrismaMapper } from '../prisma/mappers/bank-account.prisma-mapper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaBankAccountRepository implements BankAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BankAccount | null> {
    const prismaBankAccount = await this.prisma.bankAccount.findUnique({
      where: { id },
    });

    if (!prismaBankAccount) {
      return null;
    }

    return BankAccountPrismaMapper.toDomain(prismaBankAccount);
  }

  async findAll(userId: string): Promise<BankAccount[]> {
    const prismaBankAccounts = await this.prisma.bankAccount.findMany({
      where: {
        userId,
      },
      orderBy: { name: 'asc' },
    });

    return prismaBankAccounts.map(BankAccountPrismaMapper.toDomain);
  }

  async findAllWithBalance(userId: string): Promise<BankAccountWithBalance[]> {
    const rows = await this.prisma.$queryRaw<BankAccountWithBalance[]>`
      SELECT
        ba.id,
        ba.user_id as "userId",
        ba.name,
        ba.initial_balance as "initialBalance",
        ba.type::text as "type",
        ba.color,
        (
          ba.initial_balance
          + COALESCE(SUM(CASE WHEN t.type = 'INCOME' THEN t.value ELSE 0 END), 0)
          - COALESCE(SUM(CASE WHEN t.type = 'EXPENSE' THEN t.value ELSE 0 END), 0)
        )::float as "currentBalance"
      FROM bank_accounts ba
      LEFT JOIN transactions t
        ON t.bank_account_id = ba.id
        AND t.user_id = ba.user_id
      WHERE ba.user_id = ${userId}::uuid
      GROUP BY ba.id
      ORDER BY ba.name ASC
    `;

    return rows;
  }

  async save(bankAccount: BankAccount): Promise<BankAccount> {
    const data = BankAccountPrismaMapper.toPrismaCreate(bankAccount);

    const prismaBankAccount = await this.prisma.bankAccount.create({
      data,
    });

    return BankAccountPrismaMapper.toDomain(prismaBankAccount);
  }

  async update(bankAccount: BankAccount): Promise<BankAccount> {
    const data = BankAccountPrismaMapper.toPrismaUpdate(bankAccount);

    const prismaBankAccount = await this.prisma.bankAccount.update({
      where: { id: bankAccount.getId() },
      data,
    });

    return BankAccountPrismaMapper.toDomain(prismaBankAccount);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.bankAccount.delete({
      where: { id },
    });
  }
}
