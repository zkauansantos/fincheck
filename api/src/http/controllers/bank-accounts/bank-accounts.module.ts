import { Module } from '@nestjs/common';
import { CreateBankAccountUseCase } from '../../../application/usecases/bank-accounts/create';
import { DeleteBankAccountUseCase } from '../../../application/usecases/bank-accounts/delete';
import { ListBankAccountsUseCase } from '../../../application/usecases/bank-accounts/list';
import { UpdateBankAccountUseCase } from '../../../application/usecases/bank-accounts/update';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { BankAccountsController } from './bank-accounts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BankAccountsController],
  providers: [
    CreateBankAccountUseCase,
    ListBankAccountsUseCase,
    UpdateBankAccountUseCase,
    DeleteBankAccountUseCase,
  ],
})
export class BankAccountsModule {}
