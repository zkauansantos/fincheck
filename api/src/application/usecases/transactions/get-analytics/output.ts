export type GetCategoryAnalyticsUseCaseOutput = {
  categories: Array<any>;
  summary: {
    monthlyIncome: number[];
    monthlyExpenses: number[];
    monthlyNetSavings: number[];
    monthlyFinalBalance: number[];
    totalIncome: number;
    totalExpenses: number;
    totalNetSavings: number;
    averageIncome: number;
    averageExpenses: number;
  };
};
