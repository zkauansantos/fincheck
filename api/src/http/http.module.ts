import { Module } from '@nestjs/common';

import { AuthModule } from './controllers/auth/auth.module';
import { BankAccountsModule } from './controllers/bank-accounts/bank-accounts.module';
import { CategoriesModule } from './controllers/categories/categories.module';
import { TransactionsModule } from './controllers/transactions/transactions.module';
import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BankAccountsModule,
    TransactionsModule,
    CategoriesModule,
  ],
})
export class HttpModule {}
