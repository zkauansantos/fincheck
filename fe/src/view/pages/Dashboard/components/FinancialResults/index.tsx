import { MONTHS } from '@/app/config/constants';
import { Tabs, TabsList, TabsTrigger } from '@/view/components/Tabs';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { ResultsChart } from './ResultsChart';
import { ResultsSummary } from './ResultsSummary';
import {
  FinancialViewMode,
  useFinancialResultsController,
} from './useFinancialResultsController';

export function FinancialResults() {
  const {
    viewMode,
    setViewMode,
    selectedYear,
    selectedMonth,
    handleNextPeriod,
    handlePreviousPeriod,
    currentResult,
    chartData,
    isLoading,
    isViewModeMonthly,
  } = useFinancialResultsController();

  if (!currentResult) return null;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <h2 className='text-xl font-bold text-gray-900 tracking-[-1px]'>
            Finanças
          </h2>
        </div>

        <div className='flex items-center gap-2'>
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as FinancialViewMode)}
          >
            <TabsList>
              <TabsTrigger value={FinancialViewMode.MONTHLY}>
                Mensal
              </TabsTrigger>
              <TabsTrigger value={FinancialViewMode.ANNUAL}>Anual</TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            onClick={handlePreviousPeriod}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          >
            <ChevronLeftIcon className='w-5 h-5' />
          </button>
          <span className='text-sm font-medium text-gray-800 min-w-[120px] text-center tracking-[-0.5px]'>
            {isViewModeMonthly && `${MONTHS[selectedMonth]} ${selectedYear}`}

            {!isViewModeMonthly && `${selectedYear}`}
          </span>
          <button
            onClick={handleNextPeriod}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          >
            <ChevronRightIcon className='w-5 h-5' />
          </button>
        </div>
      </div>

      <ResultsSummary
        income={currentResult.income}
        expenses={currentResult.expenses}
        result={currentResult.result}
        isLoading={isLoading}
      />

      <ResultsChart
        data={chartData}
        isLoading={isLoading}
        viewMode={viewMode}
      />
    </div>
  );
}
