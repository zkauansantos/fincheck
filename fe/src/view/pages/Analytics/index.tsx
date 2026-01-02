import useCategoryAnalytics from '@/app/services/categories/hooks/useCategoryAnalytics';
import Button from '@/view/components/Button';
import { Header } from '@/view/components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { EvolutionChart } from './components/EvolutionChart';
import { SummaryTable } from './components/SummaryTable';
import { useAnalyticsController } from './useAnalyticsController';

export default function Analytics() {
  const { selectedYear, setSelectedYear } = useAnalyticsController();
  const { summary, isLoading } = useCategoryAnalytics({ year: selectedYear });

  return (
    <div className='h-full w-full p-4 md:p-8 md:pt-6 flex flex-col gap-4'>
      <Header />

      <div className='flex items-center justify-between px-4'>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-700'>
          Evolução
        </h3>

        <div className='flex items-center gap-2'>
          <Button
            onClick={() => setSelectedYear(selectedYear - 1)}
            variant='ghost'
            className='cursor-pointer px-0 border-0! shadow-0'
          >
            <ChevronLeft />
          </Button>

          <span className='text-sm font-medium text-gray-800 min-w-[80px] text-center tracking-[-0.5px]'>
            {selectedYear}
          </span>

          <Button
            onClick={() => setSelectedYear(selectedYear + 1)}
            variant='ghost'
            className='cursor-pointer px-0 border-0! shadow-0'
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <EvolutionChart summary={summary} isLoading={isLoading} />

      <SummaryTable summary={summary} isLoading={isLoading} />

      <CategoryBreakdown year={selectedYear} />
    </div>
  );
}
