import { Category } from '../entities/category.entity';
import { Transaction } from '../entities/transaction.entity';
import { TransactionType } from '../enums/transaction-type.enum';
import {
  AnalyticsResult,
  CategoryAnalyticsData,
  FinancialSummary,
} from './category-analytics.types';

export class CategoryAnalyticsService {
  private static readonly MONTHS_IN_YEAR = 12;

  static calculate(
    categories: Category[],
    transactions: Transaction[],
  ): AnalyticsResult {
    const categoryMap = this.initializeCategoryMap(categories);

    const { monthlyIncome, monthlyExpenses } = this.processTransactions(
      transactions,
      categoryMap,
    );

    const categoriesWithAverages = this.calculateCategoryAverages(categoryMap);

    const summary = this.calculateFinancialSummary(
      monthlyIncome,
      monthlyExpenses,
    );

    return {
      incomingCategories: categoriesWithAverages.filter(
        (category) => category.type === TransactionType.INCOME,
      ),
      expenseCategories: categoriesWithAverages.filter(
        (category) => category.type === TransactionType.EXPENSE,
      ),
      summary,
    };
  }

  private static initializeCategoryMap(categories: Category[]) {
    const categoryMap = new Map<string, CategoryAnalyticsData>();

    categories.forEach((category) => {
      categoryMap.set(category.getId(), {
        type: category.getType(),
        categoryId: category.getId(),
        categoryName: category.getName(),
        categoryIcon: category.getIcon(),
        months: Array(this.MONTHS_IN_YEAR).fill(0),
        totalIncome: 0,
        totalExpense: 0,
        averageIncome: 0,
        averageExpense: 0,
      });
    });

    return categoryMap;
  }

  private static processTransactions(
    transactions: Transaction[],
    categoryMap: Map<string, CategoryAnalyticsData>,
  ) {
    const monthlyIncome = Array(this.MONTHS_IN_YEAR).fill(0);
    const monthlyExpenses = Array(this.MONTHS_IN_YEAR).fill(0);

    transactions.forEach((transaction) => {
      const categoryId = transaction.getCategoryId();
      const month = transaction.getDate().getMonth();
      const value = transaction.getValue();
      const isIncome = transaction.getType() === TransactionType.INCOME;

      const category = categoryMap.get(categoryId);
      if (!category) {
        return;
      }

      category.months[month] += value;

      if (isIncome) {
        category.totalIncome += value;
        monthlyIncome[month] += value;
      } else {
        category.totalExpense += value;
        monthlyExpenses[month] += value;
      }
    });

    return { monthlyIncome, monthlyExpenses };
  }

  private static calculateCategoryAverages(
    categoryMap: Map<string, CategoryAnalyticsData>,
  ): CategoryAnalyticsData[] {
    return Array.from(categoryMap.values()).map((category) => ({
      ...category,
      averageIncome: category.totalIncome / this.MONTHS_IN_YEAR,
      averageExpense: category.totalExpense / this.MONTHS_IN_YEAR,
    }));
  }

  private static calculateFinancialSummary(
    monthlyIncome: number[],
    monthlyExpenses: number[],
  ): FinancialSummary {
    const totalIncome = monthlyIncome.reduce((sum, val) => sum + val, 0);
    const totalExpenses = monthlyExpenses.reduce((sum, val) => sum + val, 0);

    const monthlyNetSavings = monthlyIncome.map(
      (income, i) => income - monthlyExpenses[i],
    );

    const monthlyFinalBalance =
      this.calculateCumulativeBalance(monthlyNetSavings);

    return {
      monthlyIncome,
      monthlyExpenses,
      monthlyNetSavings,
      monthlyFinalBalance,
      totalIncome,
      totalExpenses,
      totalNetSavings: totalIncome - totalExpenses,
      averageIncome: totalIncome / this.MONTHS_IN_YEAR,
      averageExpenses: totalExpenses / this.MONTHS_IN_YEAR,
    };
  }

  private static calculateCumulativeBalance(
    monthlyNetSavings: number[],
  ): number[] {
    let cumulativeBalance = 0;

    return monthlyNetSavings.map((netSaving) => {
      cumulativeBalance += netSaving;
      return cumulativeBalance;
    });
  }
}
