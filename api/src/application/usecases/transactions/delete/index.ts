import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { DeleteTransactionUseCaseInput } from './input';
import { DeleteTransactionUseCaseOutput } from './output';

@Injectable()
export class DeleteTransactionUseCase
  implements
    UseCase<
      DeleteTransactionUseCaseInput,
      Promise<DeleteTransactionUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: DeleteTransactionUseCaseInput,
  ): Promise<DeleteTransactionUseCaseOutput> {
    const { transactionId, userId } = input;

    const transaction = await this.transactionRepository.findById(
      transactionId,
    );

    if (!transaction) {
      throw ResourceNotFoundException.transaction(transactionId);
    }

    if (!transaction.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership("transação");
    }

    await this.transactionRepository.delete(transactionId);
  }
}
