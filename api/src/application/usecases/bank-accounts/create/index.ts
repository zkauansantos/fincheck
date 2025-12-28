import { Injectable } from '@nestjs/common';
import { BankAccount } from '../../../../domain/entities/bank-account.entity';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { CreateBankAccountUseCaseInput } from './input';
import { CreateBankAccountUseCaseOutput } from './output';

@Injectable()
export class CreateBankAccountUseCase
  implements
    UseCase<
      CreateBankAccountUseCaseInput,
      Promise<CreateBankAccountUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('BANK_ACCOUNTS')
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(
    input: CreateBankAccountUseCaseInput,
  ): Promise<CreateBankAccountUseCaseOutput> {
    const { userId, name, initialBalance, type, color } = input;

    const bankAccount = BankAccount.create({
      userId,
      name,
      initialBalance,
      type,
      color,
    });

    await this.bankAccountRepository.save(bankAccount);

    return {
      id: bankAccount.getId(),
      userId: bankAccount.getUserId(),
      name: bankAccount.getName(),
      initialBalance: bankAccount.getInitialBalance().getValue(),
      type: bankAccount.getType(),
      color: bankAccount.getColor(),
    };
  }
}
