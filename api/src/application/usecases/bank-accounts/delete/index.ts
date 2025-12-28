import { Injectable } from '@nestjs/common';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
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
  ) {}

  async execute(
    input: DeleteBankAccountUseCaseInput,
  ): Promise<DeleteBankAccountUseCaseOutput> {
    const { bankAccountId, userId } = input;

    const bankAccount = await this.bankAccountRepository.findById(
      bankAccountId,
    );

    if (!bankAccount) {
      throw ResourceNotFoundException.bankAccount(bankAccountId);
    }

    if (!bankAccount.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership('conta bancária');
    }

    await this.bankAccountRepository.delete(bankAccountId);
  }
}
