import { Module } from '@nestjs/common';
import { CreateTransactionUseCase } from '../../../application/usecases/transactions/create';
import { DeleteTransactionUseCase } from '../../../application/usecases/transactions/delete';
import { GetCategoryAnalyticsUseCase } from '../../../application/usecases/transactions/get-analytics';
import { ListTransactionsUseCase } from '../../../application/usecases/transactions/list';
import { UpdateTransactionUseCase } from '../../../application/usecases/transactions/update';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    ListTransactionsUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
    GetCategoryAnalyticsUseCase,
  ],
})
export class TransactionsModule {}
