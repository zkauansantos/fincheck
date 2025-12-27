import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { DeleteBankAccountUseCaseInput } from './input';
import { DeleteBankAccountUseCaseOutput } from './output';

@Injectable()
export class DeleteBankAccountUseCase
  implements
    UseCase<
      DeleteBankAccountUseCaseInput,
      Promise<DeleteBankAccountUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('BANK_ACCOUNTS')
    private readonly bankAccountRepository: BankAccountRepository,
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: DeleteBankAccountUseCaseInput,
  ): Promise<DeleteBankAccountUseCaseOutput> {
    const { bankAccountId, userId } = input;

    const bankAccount = await this.bankAccountRepository.findById(
      bankAccountId,
    );

    if (!bankAccount) {
      throw EntityNotFoundException.bankAccount(bankAccountId);
    }

    if (!bankAccount.belongsToUser(userId)) {
      throw InvalidOwnershipException.bankAccount(bankAccountId);
    }

    await this.bankAccountRepository.delete(bankAccountId);
  }
}
