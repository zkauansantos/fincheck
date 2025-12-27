import { Injectable } from '@nestjs/common';
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
    @InjectRepository('TRANSACTIONS')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    input: GetCategoryAnalyticsUseCaseInput,
  ): Promise<GetCategoryAnalyticsUseCaseOutput> {
    const { userId, year, bankAccountId } = input;

    const transactions = await this.transactionRepository.findByAnalytics({
      userId,
      year,
      bankAccountId,
    });

    const categoryMap = new Map();
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);

    transactions.forEach((transaction: any) => {
      const categoryId = transaction.categoryId;
      const categoryName = transaction.category?.name || 'Sem categoria';
      const categoryIcon = transaction.category?.icon || '';
      const month = new Date(transaction.date).getMonth();
      const isIncome = transaction.type === 'INCOME';

      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          categoryId,
          categoryName,
          categoryIcon,
          months: Array(12).fill(0),
          totalIncome: 0,
          totalExpense: 0,
          averageIncome: 0,
          averageExpense: 0,
        });
      }

      const category = categoryMap.get(categoryId);
      category.months[month] += transaction.value;

      if (isIncome) {
        category.totalIncome += transaction.value;
        monthlyIncome[month] += transaction.value;
      } else {
        category.totalExpense += transaction.value;
        monthlyExpenses[month] += transaction.value;
      }
    });

    const categories = Array.from(categoryMap.values()).map((category) => ({
      ...category,
      averageIncome: category.totalIncome > 0 ? category.totalIncome / 12 : 0,
      averageExpense:
        category.totalExpense > 0 ? category.totalExpense / 12 : 0,
    }));

    const totalIncome = monthlyIncome.reduce((sum, val) => sum + val, 0);
    const totalExpenses = monthlyExpenses.reduce((sum, val) => sum + val, 0);

    const monthlyNetSavings = monthlyIncome.map(
      (income, i) => income - monthlyExpenses[i],
    );

    let cumulativeBalance = 0;
    const monthlyFinalBalance = monthlyNetSavings.map((netSaving) => {
      cumulativeBalance += netSaving;
      return cumulativeBalance;
    });

    return {
      categories,
      summary: {
        monthlyIncome,
        monthlyExpenses,
        monthlyNetSavings,
        monthlyFinalBalance,
        totalIncome,
        totalExpenses,
        totalNetSavings: totalIncome - totalExpenses,
        averageIncome: totalIncome / 12,
        averageExpenses: totalExpenses / 12,
      },
    };
  }
}
