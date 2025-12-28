import { Global, Module } from '@nestjs/common';
import { REPOSITORY_TOKENS } from '../../../domain/repositories/tokens/repository.tokens';
import { PrismaBankAccountRepository } from '../repositories/prisma-bank-account.repository';
import { PrismaCategoryRepository } from '../repositories/prisma-category.repository';
import { PrismaSubcategoryRepository } from '../repositories/prisma-subcategory.repository';
import { PrismaTransactionRepository } from '../repositories/prisma-transaction.repository';
import { PrismaUserRepository } from '../repositories/prisma-user.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: REPOSITORY_TOKENS.USERS,
      useClass: PrismaUserRepository,
    },
    {
      provide: REPOSITORY_TOKENS.BANK_ACCOUNTS,
      useClass: PrismaBankAccountRepository,
    },
    {
      provide: REPOSITORY_TOKENS.TRANSACTIONS,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: REPOSITORY_TOKENS.CATEGORIES,
      useClass: PrismaCategoryRepository,
    },
    {
      provide: REPOSITORY_TOKENS.SUBCATEGORIES,
      useClass: PrismaSubcategoryRepository,
    },
  ],
  exports: [
    REPOSITORY_TOKENS.USERS,
    REPOSITORY_TOKENS.BANK_ACCOUNTS,
    REPOSITORY_TOKENS.TRANSACTIONS,
    REPOSITORY_TOKENS.CATEGORIES,
    REPOSITORY_TOKENS.SUBCATEGORIES,
  ],
})
export class PrismaModule {}
