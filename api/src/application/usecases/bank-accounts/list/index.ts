import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { ListBankAccountsUseCaseInput } from './input';
import { ListBankAccountsUseCaseOutput } from './output';

@Injectable()
export class ListBankAccountsUseCase
  implements
    UseCase<
      ListBankAccountsUseCaseInput,
      Promise<ListBankAccountsUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('BANK_ACCOUNTS')
    private readonly bankAccountRepository: BankAccountRepository,
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: ListBankAccountsUseCaseInput,
  ): Promise<ListBankAccountsUseCaseOutput> {
    const { userId } = input;

    const bankAccounts = await this.bankAccountRepository.findAllByUserId(
      userId,
    );

    const bankAccountsWithBalance = await Promise.all(
      bankAccounts.map(async (bankAccount) => {
        const incomeSum =
          await this.transactionRepository.sumIncomeByBankAccountId(
            bankAccount.getId(),
          );

        const expenseSum =
          await this.transactionRepository.sumExpenseByBankAccountId(
            bankAccount.getId(),
          );

        const currentBalance = bankAccount.calculateCurrentBalance(
          incomeSum,
          expenseSum,
        );

        return {
          id: bankAccount.getId(),
          userId: bankAccount.getUserId(),
          name: bankAccount.getName(),
          initialBalance: bankAccount.getInitialBalance().getValue(),
          type: bankAccount.getType(),
          color: bankAccount.getColor(),
          currentBalance,
        };
      }),
    );

    return bankAccountsWithBalance;
  }
}
