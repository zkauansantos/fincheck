import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/domain/repositories/category.repository.interface';
import { CategoryAnalyticsService } from 'src/domain/services/category-analytics.service';
import { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { GetCategoryAnalyticsUseCaseInput } from './input';
import { GetCategoryAnalyticsUseCaseOutput } from './output';

@Injectable()
export class GetCategoryAnalyticsUseCase
  implements
    UseCase<
      GetCategoryAnalyticsUseCaseInput,
      Promise<GetCategoryAnalyticsUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoriesRepository: CategoryRepository,
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: GetCategoryAnalyticsUseCaseInput,
  ): Promise<GetCategoryAnalyticsUseCaseOutput> {
    const { userId, year, bankAccountId } = input;

    const [categories, transactions] = await Promise.all([
      this.categoriesRepository.findAllAccessibleByUser(userId),
      this.transactionRepository.findByAnalytics({
        userId,
        year,
        bankAccountId,
      }),
    ]);

    return CategoryAnalyticsService.calculate(categories, transactions);
  }
}
