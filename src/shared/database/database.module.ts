import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositiories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { BankAccountsRepository } from './repositories/bankAccounts.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
  ],
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
})
export class DatabaseModule {}
