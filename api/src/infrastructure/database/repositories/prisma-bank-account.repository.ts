import { Injectable } from '@nestjs/common';
import { BankAccount } from '../../../domain/entities/bank-account.entity';
import { BankAccountRepository } from '../../../domain/repositories/bank-account.repository.interface';
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

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<BankAccount | null> {
    const prismaBankAccount = await this.prisma.bankAccount.findFirst({
      where: { id, userId },
    });

    if (!prismaBankAccount) {
      return null;
    }

    return BankAccountPrismaMapper.toDomain(prismaBankAccount);
  }

  async findAllByUserId(userId: string): Promise<BankAccount[]> {
    const prismaBankAccounts = await this.prisma.bankAccount.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    return prismaBankAccounts.map(BankAccountPrismaMapper.toDomain);
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

  async countByUserId(userId: string): Promise<number> {
    return this.prisma.bankAccount.count({
      where: { userId },
    });
  }
}
