import cn from '@/app/utils/cn';
import {
  CheckCircle2Icon,
  Info,
  MoveDownLeft,
  MoveUpRight,
} from 'lucide-react';
import formatCurrency from '@/app/utils/formatCurrency';

interface ResultsSummaryProps {
  income: number;
  expenses: number;
  result: number;
  isLoading?: boolean;
}

export function ResultsSummary({
  income,
  expenses,
  result,
  isLoading,
}: ResultsSummaryProps) {
  const isResultPositive = result >= 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='bg-gray-50 p-6 rounded-2xl'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <span className='text-gray-600 text-sm tracking-[-0.5px]'>
              Entradas
            </span>
            {isLoading ? (
              <div className='h-8 w-32 bg-gray-200 rounded mt-1 animate-pulse' />
            ) : (
              <p className='text-2xl font-bold text-teal-800 mt-1 tracking-[-1px]'>
                {formatCurrency(income)}
              </p>
            )}
          </div>
          <div className='w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center'>
            <MoveUpRight className='text-teal-800' />
          </div>
        </div>
      </div>

      <div className='bg-gray-50 p-6 rounded-2xl'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <span className='text-gray-600 text-sm tracking-[-0.5px]'>
              Saídas
            </span>
            {isLoading ? (
              <div className='h-8 w-32 bg-gray-200 rounded mt-1 animate-pulse' />
            ) : (
              <p className='text-2xl font-bold text-red-800 mt-1 tracking-[-1px]'>
                {formatCurrency(expenses)}
              </p>
            )}
          </div>
          <div className='w-12 h-12 bg-red-50 rounded-full flex items-center justify-center'>
            <MoveDownLeft className='text-red-800' />
          </div>
        </div>
      </div>

      <div className='bg-gray-50 p-6 rounded-2xl'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <span className='text-gray-600 text-sm tracking-[-0.5px]'>
              Resultado
            </span>
            {isLoading ? (
              <div className='h-8 w-32 bg-gray-200 rounded mt-1 animate-pulse' />
            ) : (
              <p
                className={cn(
                  'text-2xl font-bold mt-1 tracking-[-1px]',
                  isResultPositive ? 'text-teal-800' : 'text-red-800'
                )}
              >
                {formatCurrency(result)}
              </p>
            )}
          </div>
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              isResultPositive ? 'bg-teal-50' : 'bg-red-50'
            )}
          >
            {isResultPositive && <CheckCircle2Icon className='text-teal-800' />}

            {!isResultPositive && <Info className='text-red-800' />}
          </div>
        </div>
      </div>
    </div>
  );
}
