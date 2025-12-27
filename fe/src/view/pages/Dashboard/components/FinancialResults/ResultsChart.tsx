import formatCurrency from '@/app/utils/formatCurrency';
import { ChartConfig, ChartContainer } from '@/view/components/Chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { FinancialViewMode } from './useFinancialResultsController';

const chartConfig = {
  income: {
    label: 'Entradas',
    color: '#087f5b',
  },
  expenses: {
    label: 'Saídas',
    color: '#991b1b',
  },
} satisfies ChartConfig;

interface ResultsChartProps {
  data: Array<{
    label: string;
    income: number;
    expenses: number;
  }>;
  isLoading?: boolean;
  viewMode: FinancialViewMode;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  viewMode: FinancialViewMode;
}

function CustomTooltip({ active, payload, viewMode }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const income = payload.find((p) => p.dataKey === 'income')?.value || 0;
  const expenses = payload.find((p) => p.dataKey === 'expenses')?.value || 0;
  const result = (income as number) - (expenses as number);
  const label = payload[0].payload.label;

  return (
    <div className='bg-white p-3 rounded-lg shadow-lg border border-gray-200'>
      <p className='text-sm font-medium text-gray-900 mb-2'>
        {viewMode === FinancialViewMode.MONTHLY ? `Dia ${label}` : label}
      </p>
      <div className='space-y-1'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-teal-700' />
            <span className='text-xs text-gray-600'>Entradas</span>
          </div>
          <span className='text-xs font-semibold text-teal-800'>
            {formatCurrency(income)}
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-red-800' />
            <span className='text-xs text-gray-600'>Saídas</span>
          </div>
          <span className='text-xs font-semibold text-red-800'>
            {formatCurrency(expenses)}
          </span>
        </div>
        <div className='pt-1 mt-1 border-t border-gray-200'>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-xs font-medium text-gray-700'>Resultado</span>
            <span
              className={`text-xs font-bold ${
                result >= 0 ? 'text-teal-800' : 'text-red-800'
              }`}
            >
              {formatCurrency(result)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultsChart({ data, isLoading, viewMode }: ResultsChartProps) {
  if (isLoading) {
    return (
      <div className='bg-white p-6 rounded-2xl'>
        <div className='h-80 flex items-center justify-center'>
          <div className='animate-pulse text-gray-400'>Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-6 rounded-2xl'>
      <h3 className='text-lg font-semibold text-gray-900 mb-6 tracking-[-0.5px]'>
        {viewMode === FinancialViewMode.ANNUAL && 'Evolução Anual'}
        {viewMode === FinancialViewMode.MONTHLY && 'Evolução Mensal'}
      </h3>

      <ChartContainer config={chartConfig} className='h-60 w-full'>
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid
            vertical={false}
            strokeDasharray='3 3'
            stroke='#e5e7eb'
          />
          <XAxis
            dataKey='label'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            content={<CustomTooltip viewMode={viewMode} />}
            cursor={false}
          />
          <Bar dataKey='income' fill='var(--color-income)' radius={4} />
          <Bar dataKey='expenses' fill='var(--color-expenses)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
