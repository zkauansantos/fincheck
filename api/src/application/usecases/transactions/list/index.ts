import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { ListTransactionsUseCaseInput } from './input';
import { ListTransactionsUseCaseOutput } from './output';

@Injectable()
export class ListTransactionsUseCase
  implements
    UseCase<
      ListTransactionsUseCaseInput,
      Promise<ListTransactionsUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: ListTransactionsUseCaseInput,
  ): Promise<ListTransactionsUseCaseOutput> {
    const { userId, month, year, bankAccountId, type } = input;

    const transactions = await this.transactionRepository.findAll({
      userId,
      month,
      year,
      bankAccountId,
      type,
    });

    return transactions.map((transaction) => ({
      id: transaction.getId(),
      userId: transaction.getUserId(),
      bankAccountId: transaction.getBankAccountId(),
      categoryId: transaction.getCategoryId(),
      subcategoryId: transaction.getSubcategoryId(),
      name: transaction.getName(),
      value: transaction.getValue().getValue(),
      date: transaction.getDate(),
      type: transaction.getType(),
    }));
  }
}
