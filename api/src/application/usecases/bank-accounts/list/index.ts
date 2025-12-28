import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
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
  ) {}

  async execute(
    input: ListBankAccountsUseCaseInput,
  ): Promise<ListBankAccountsUseCaseOutput> {
    const { userId } = input;

    const bankAccounts = await this.bankAccountRepository.findAllWithBalance(
      userId,
    );

    return bankAccounts.map((bankAccount) => ({
      color: bankAccount.color,
      currentBalance: bankAccount.currentBalance,
      id: bankAccount.id,
      initialBalance: bankAccount.initialBalance,
      name: bankAccount.name,
      type: bankAccount.type,
      userId: bankAccount.userId,
    }));
  }
}
