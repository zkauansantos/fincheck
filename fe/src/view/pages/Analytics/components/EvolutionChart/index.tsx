import { MONTHS } from '@/app/config/constants';
import { useTheme } from '@/app/contexts/ThemeContext';
import { AnalyticsSummary } from '@/app/services/transactions/getCategoryAnalytics';
import formatCurrency from '@/app/utils/formatCurrency';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

interface EvolutionChartProps {
  summary: AnalyticsSummary;
  isLoading: boolean;
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
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

export function EvolutionChart({ summary, isLoading }: EvolutionChartProps) {
  const { theme } = useTheme();

  const chartData = MONTHS.map((month, index) => ({
    label: month,
    income: summary.monthlyIncome[index],
    expenses: summary.monthlyExpenses[index],
    balance: summary.monthlyNetSavings[index],
  }));

  if (isLoading) {
    return (
      <div className='p-6 rounded-2xl'>
        <div className='h-60 flex items-center justify-center'>
          <div className='animate-pulse text-gray-400'>
            Carregando gráfico...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={chartData}>
          {theme !== 'dark' && (
            <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
          )}
          <XAxis
            dataKey='label'
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => {
              if (Math.abs(value) >= 1_000_000)
                return (value / 1000000).toFixed(1).replace('.0', '') + 'M';

              if (Math.abs(value) >= 1_000)
                return (value / 1_000).toFixed(1).replace('.0', '') + 'k';

              return value;
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: theme !== 'dark' ? '#f9fafb' : 'rgba(0,0,0,0.09)' }}
          />

          <Bar
            dataKey='income'
            fill='#099268'
            name='Renda'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='expenses'
            fill='#E03131'
            name='Despesas'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='balance'
            fill='#ADB5BD'
            name='Saldo'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
