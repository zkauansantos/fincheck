import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createBankAccountDto);
  }

  findAll(findAllBankAccountDto: Prisma.BankAccountFindManyArgs) {
    return this.prismaService.bankAccount.findMany(findAllBankAccountDto);
  }

  findUnique(findUniqueBankAccountDto: Prisma.BankAccountFindUniqueArgs) {
    return this.prismaService.bankAccount.findUnique(findUniqueBankAccountDto);
  }

  update(updateBankAccountDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateBankAccountDto);
  }

  delete(deleteBankAccountDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteBankAccountDto);
  }
}
