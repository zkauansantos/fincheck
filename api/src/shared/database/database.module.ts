import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';
import { CategoriesRepository } from './repositories/categories.repositories';
import { SubcategoriesRepository } from './repositories/subcategories.repositories';
import { TransactionsRepository } from './repositories/transactions.respositories';
import { UsersRepository } from './repositories/users.repositiories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    SubcategoriesRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
    SubcategoriesRepository,
  ],
})
export class DatabaseModule {}
