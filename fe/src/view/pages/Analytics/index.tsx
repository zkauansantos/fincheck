import Logo from '@/view/components/Logo';
import UserMenu from '@/view/components/UserMenu';
import { Link } from 'react-router-dom';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { useAnalyticsController } from './useAnalyticsController';

export default function Analytics() {
  const { selectedYear, setSelectedYear } = useAnalyticsController();

  return (
    <div className='h-full w-full p-4 md:p-8 md:pt-6 flex flex-col gap-4'>
      <header className='flex items-center justify-between h-12'>
        <div className='flex items-center gap-6'>
          <Logo className='h-6 text-teal-900' />
          <nav className='flex gap-4'>
            <Link
              to='/'
              className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
            >
              Dashboard
            </Link>
            <Link
              to='/analytics'
              className='text-sm font-medium text-teal-800 hover:text-teal-900 transition-colors'
            >
              Análise
            </Link>
          </nav>
        </div>
        <UserMenu />
      </header>

      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 tracking-[-1px]'>
          Análise Financeira
        </h1>
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
