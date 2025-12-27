import { MONTHS } from '../config/constants';
import { Transaction } from '../entities/Transaction';

export interface FinancialResult {
  income: number;
  expenses: number;
  result: number;
}

export interface MonthlyResult extends FinancialResult {
  month: number;
  year: number;
  monthName: string;
}

export interface DailyResult extends FinancialResult {
  day: number;
  date: string;
}

export interface AnnualResult extends FinancialResult {
  year: number;
  monthlyBreakdown: MonthlyResult[];
}

export function calculateFinancialResults(
  transactions: Transaction[]
): FinancialResult {
  const income = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.value, 0);

  const expenses = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.value, 0);

  return {
    income,
    expenses,
    result: income - expenses,
  };
}

export function calculateMonthlyResult(
  transactions: Transaction[],
  month: number,
  year: number,
  monthName: string
): MonthlyResult {
  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const { income, expenses, result } =
    calculateFinancialResults(monthTransactions);

  return {
    income,
    expenses,
    result,
    month,
    year,
    monthName,
  };
}

export function calculateDailyBreakdown(
  transactions: Transaction[],
  month: number,
  year: number
): DailyResult[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dailyResults: DailyResult[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });

    const { income, expenses, result } =
      calculateFinancialResults(dayTransactions);

    dailyResults.push({
      day,
      date: new Date(year, month, day).toISOString(),
      income,
      expenses,
      result,
    });
  }

  return dailyResults;
}

export function calculateAnnualResult(
  transactions: Transaction[],
  year: number
): AnnualResult {
  const monthlyBreakdown: MonthlyResult[] = MONTHS.map((monthName, index) =>
    calculateMonthlyResult(transactions, index, year, monthName)
  );

  const yearTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getFullYear() === year;
  });

  const { income, expenses, result } =
    calculateFinancialResults(yearTransactions);

  return {
    year,
    income,
    expenses,
    result,
    monthlyBreakdown,
  };
}
