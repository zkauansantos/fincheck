import { MONTHS } from '@/app/config/constants';
import { AnalyticsSummary } from '@/app/services/transactions/getCategoryAnalytics';
import formatCurrency from '@/app/utils/formatCurrency';
import { DataTable } from '@/view/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface SummaryTableProps {
  summary: AnalyticsSummary;
  isLoading: boolean;
}

interface SummaryRow {
  label: string;
  months: number[];
  total: number;
  average: number;
  type: 'income' | 'expense' | 'net' | 'balance';
}

export function SummaryTable({ summary, isLoading }: SummaryTableProps) {
  const data: SummaryRow[] = [
    {
      label: 'Renda',
      months: summary.monthlyIncome,
      total: summary.totalIncome,
      average: summary.averageIncome,
      type: 'income',
    },
    {
      label: 'Despesas',
      months: summary.monthlyExpenses,
      total: summary.totalExpenses,
      average: summary.averageExpenses,
      type: 'expense',
    },
    {
      label: 'Economia líquida',
      months: summary.monthlyNetSavings,
      total: summary.totalNetSavings,
      average: summary.totalNetSavings / 12,
      type: 'net',
    },
    {
      label: 'Saldo final',
      months: summary.monthlyFinalBalance,
      total: 0,
      average: 0,
      type: 'balance',
    },
  ];

  const columns = useMemo<ColumnDef<SummaryRow>[]>(
    () => [
      {
        accessorKey: 'label',
        header: '',
        cell: ({ row }) => (
          <span className='font-semibold text-gray-900'>{row.original.label}</span>
        ),
      },
      ...MONTHS.map((month, index) => ({
        accessorKey: `month_${index}`,
        header: month,
        cell: ({ row }: { row: { original: SummaryRow } }) => {
          const value = row.original.months[index];
          let colorClass = 'text-gray-700';

          if (row.original.type === 'income') {
            colorClass = 'text-teal-800';
          } else if (row.original.type === 'expense') {
            colorClass = 'text-red-800';
          } else if (row.original.type === 'net') {
            colorClass = value >= 0 ? 'text-teal-800' : 'text-red-800';
          } else if (row.original.type === 'balance') {
            colorClass = value >= 0 ? 'text-teal-800' : 'text-red-800';
          }

          return (
            <span className={colorClass}>
              {formatCurrency(value)}
            </span>
          );
        },
      })),
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
          if (row.original.type === 'balance') {
            return <span className='text-gray-400'>-</span>;
          }

          let colorClass = 'text-gray-900';
          if (row.original.type === 'income') {
            colorClass = 'text-teal-800';
          } else if (row.original.type === 'expense') {
            colorClass = 'text-red-800';
          } else if (row.original.type === 'net') {
            colorClass = row.original.total >= 0 ? 'text-teal-800' : 'text-red-800';
          }

          return (
            <span className={`font-semibold ${colorClass}`}>
              {formatCurrency(row.original.total)}
            </span>
          );
        },
      },
      {
        accessorKey: 'average',
        header: 'Média',
        cell: ({ row }) => {
          if (row.original.type === 'balance') {
            return <span className='text-gray-400'>-</span>;
          }

          let colorClass = 'text-gray-700';
          if (row.original.type === 'income') {
            colorClass = 'text-teal-800';
          } else if (row.original.type === 'expense') {
            colorClass = 'text-red-800';
          } else if (row.original.type === 'net') {
            colorClass = row.original.average >= 0 ? 'text-teal-800' : 'text-red-800';
          }

          return (
            <span className={`font-medium ${colorClass}`}>
              {formatCurrency(row.original.average)}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className='p-6 rounded-2xl h-[400px]'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
        Resumo
      </h3>
      <DataTable.Root data={data} columns={columns} isLoading={isLoading}>
        <DataTable.Content />
      </DataTable.Root>
    </div>
  );
}
