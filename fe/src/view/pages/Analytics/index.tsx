import { Header } from '@/view/components/Header';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { useAnalyticsController } from './useAnalyticsController';

export default function Analytics() {
  const { selectedYear, setSelectedYear } = useAnalyticsController();

  return (
    <div className='h-full w-full p-4 md:p-8 md:pt-6 flex flex-col gap-4'>
      <Header />

      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold text-gray-900 tracking-[-1px]'>
          Análise Financeira
        </h2>

        <div className='flex items-center gap-2'>
          <button
            onClick={() => setSelectedYear(selectedYear - 1)}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          >
            ←
          </button>
          <span className='text-sm font-medium text-gray-800 min-w-[80px] text-center tracking-[-0.5px]'>
            {selectedYear}
          </span>
          <button
            onClick={() => setSelectedYear(selectedYear + 1)}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700'
          >
            →
          </button>
        </div>
      </div>

      <CategoryBreakdown year={selectedYear} />
    </div>
  );
}
