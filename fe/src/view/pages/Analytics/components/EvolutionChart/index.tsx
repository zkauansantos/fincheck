import { MONTHS } from '@/app/config/constants';
import { useTheme } from '@/app/hooks/useTheme';
import { AnalyticsSummary } from '@/app/services/transactions/getCategoryAnalytics';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface EvolutionChartProps {
  summary: AnalyticsSummary;
  isLoading: boolean;
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
