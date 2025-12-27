import useAnnualTransactions from '@/app/services/transactions/hooks/useAnnualTransactions';
import useTransactions from '@/app/services/transactions/hooks/useTransactions';
import {
  calculateAnnualResult,
  calculateDailyBreakdown,
  calculateFinancialResults,
} from '@/app/utils/calculateFinancialResults';
import { useMemo, useState } from 'react';

export enum FinancialViewMode {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}

export function useFinancialResultsController() {
  const [viewMode, setViewMode] = useState<FinancialViewMode>(FinancialViewMode.MONTHLY);

  const [{ month, year }, setFilters] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const isViewModeMonthly = viewMode === FinancialViewMode.MONTHLY;

  const { transactions: monthlyTransactions, isLoading: isMonthlyLoading, } = useTransactions({
    month,
    year,
  });

  const { transactions: annualTransactions, isLoading: isAnnualLoading } = useAnnualTransactions({
    year,
  });

  const monthlyResult = useMemo(
    () => calculateFinancialResults(monthlyTransactions), [monthlyTransactions]
  );

  const dailyBreakdown = useMemo(
    () => calculateDailyBreakdown(monthlyTransactions, month, year), [monthlyTransactions, month, year]
  );

  const annualResult = useMemo(
    () => calculateAnnualResult(annualTransactions, year), [annualTransactions, year]
  );

  const currentResult = isViewModeMonthly ? monthlyResult : annualResult;

  const isLoading = isViewModeMonthly ? isMonthlyLoading : isAnnualLoading;

  function handlePreviousPeriod() {
    setFilters(prev => {
      if (!isViewModeMonthly) {
        return { ...prev, year: prev.year - 1 }
      }

      const isJanuary = prev.month === 0;

      if (isJanuary) {
        return { month: 11, year: prev.year - 1 }
      }

      return { ...prev, month: prev.month - 1 }
    })
  }

  function handleNextPeriod() {
    setFilters(prev => {
      if (!isViewModeMonthly) {
        return { ...prev, year: prev.year + 1 }
      }

      const isDecember = prev.month === 11;

      if (isDecember) {
        return { month: 0, year: prev.year + 1 }
      }

      return { ...prev, month: prev.month + 1 }
    })
  }


  const chartData = !isViewModeMonthly
    ? annualResult.monthlyBreakdown.map((month) => ({
      label: month.monthName,
      income: month.income,
      expenses: month.expenses,
    }))
    : Array.isArray(dailyBreakdown)
      ? dailyBreakdown.map((day) => ({
        label: day.day?.toString() || '',
        income: day.income,
        expenses: day.expenses,
      }))
      : [];

  return {
    viewMode,
    setViewMode,
    selectedYear: year,
    selectedMonth: month,
    handleNextPeriod,
    handlePreviousPeriod,
    currentResult,
    chartData,
    isLoading,
    isViewModeMonthly,
  };
}
