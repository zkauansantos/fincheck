import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
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
      throw EntityNotFoundException.transaction(transactionId);
    }

    if (!transaction.belongsToUser(userId)) {
      throw InvalidOwnershipException.transaction(transactionId);
    }

    await this.transactionRepository.delete(transactionId);
  }
}
