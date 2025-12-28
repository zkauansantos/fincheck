import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { BankAccountRepository } from '../../../../domain/repositories/bank-account.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { UpdateBankAccountUseCaseInput } from './input';
import { UpdateBankAccountUseCaseOutput } from './output';

@Injectable()
export class UpdateBankAccountUseCase
  implements
    UseCase<
      UpdateBankAccountUseCaseInput,
      Promise<UpdateBankAccountUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('BANK_ACCOUNTS')
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(
    input: UpdateBankAccountUseCaseInput,
  ): Promise<UpdateBankAccountUseCaseOutput> {
    const { bankAccountId, userId, name, initialBalance, color } = input;

    const bankAccount = await this.bankAccountRepository.findById(
      bankAccountId,
    );

    if (!bankAccount) {
      throw ResourceNotFoundException.bankAccount(bankAccountId);
    }

    if (!bankAccount.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership("conta bancária");
    }

    bankAccount.updateName(name);
    bankAccount.updateInitialBalance(initialBalance);
    bankAccount.updateColor(color);

    await this.bankAccountRepository.update(bankAccount);

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
