import formatCurrency from '@/app/utils/formatCurrency';
import { TooltipProps } from 'recharts';

export function CustomTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload || !payload.length) return null;

  const income = payload.find((p) => p.dataKey === 'income')?.value || 0;
  const expenses = payload.find((p) => p.dataKey === 'expenses')?.value || 0;
  const balance = payload.find((p) => p.dataKey === 'balance')?.value || 0;
  const label = payload[0].payload.label;

  return (
    <div className='bg-white dark:bg-gray-50 p-3 rounded-lg shadow-lg border border-gray-200'>
      <p className='text-sm font-medium text-gray-900 mb-2'>{label}</p>
      <div className='space-y-1'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-teal-800' />
            <span className='text-xs text-gray-600'>Renda</span>
          </div>
          <span className='text-xs font-semibold text-teal-800'>
            {formatCurrency(income)}
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-800' />
            <span className='text-xs text-gray-600'>Despesas</span>
          </div>
          <span className='text-xs font-semibold text-red-800'>
            {formatCurrency(expenses)}
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-gray-500' />
            <span className='text-xs text-gray-500'>Saldo</span>
          </div>
          <span className='text-xs font-semibold text-gray-500'>
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </div>
  );
}
