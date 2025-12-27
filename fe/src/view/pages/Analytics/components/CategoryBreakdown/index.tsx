import { MONTHS } from '@/app/config/constants';
import useCategoryAnalytics from '@/app/services/categories/hooks/useCategoryAnalytics';
import formatCurrency from '@/app/utils/formatCurrency';
import { DataTable } from '@/view/components/DataTable';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface CategoryBreakdownProps {
  year: number;
}

interface CategoryAnalyticsRow {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  months: number[];
  totalExpense: number;
  totalIncome: number;
  averageExpense: number;
  averageIncome: number;
  type: 'expense' | 'income';
}

export function CategoryBreakdown({ year }: CategoryBreakdownProps) {
  const { categories, isLoading } = useCategoryAnalytics({ year });

  const incomeCategories = categories.filter((cat) => cat.totalIncome > 0);
  const expenseCategories = categories.filter((cat) => cat.totalExpense > 0);

  const expenseColumns = useMemo<ColumnDef<CategoryAnalyticsRow>[]>(
    () => [
      {
        accessorKey: 'categoryName',
        header: 'Categoria',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <span>
              <CategoryIcon
                type='expense'
                category={row.original.categoryIcon}
              />
            </span>
            <span className='font-medium text-gray-900'>
              {row.original.categoryName}
            </span>
          </div>
        ),
      },
      ...MONTHS.map((month, index) => ({
        accessorKey: `month_${index}`,
        header: month,
        cell: ({ row }: { row: { original: CategoryAnalyticsRow } }) => {
          const value = row.original.months[index];

          return (
            <span className='text-gray-700'>{formatCurrency(value ?? 0)}</span>
          );
        },
      })),
      {
        accessorKey: 'totalExpense',
        header: 'Total',
        cell: ({ row }) => (
          <span className='font-semibold text-red-800'>
            {formatCurrency(row.original.totalExpense)}
          </span>
        ),
      },
      {
        accessorKey: 'averageExpense',
        header: 'Média',
        cell: ({ row }) => (
          <span className='font-medium text-gray-700'>
            {formatCurrency(row.original.averageExpense)}
          </span>
        ),
      },
    ],
    []
  );

  const incomeColumns = useMemo<ColumnDef<CategoryAnalyticsRow>[]>(
    () => [
      {
        accessorKey: 'categoryName',
        header: 'Categoria',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <span>
              <CategoryIcon
                type='income'
                category={row.original.categoryIcon}
              />
            </span>
            <span className='font-medium text-gray-900'>
              {row.original.categoryName}
            </span>
          </div>
        ),
      },
      ...MONTHS.map((month, index) => ({
        accessorKey: `month_${index}`,
        header: month,
        cell: ({ row }: { row: { original: CategoryAnalyticsRow } }) => {
          const value = row.original.months[index];
          return (
            <span className='text-gray-700'>{formatCurrency(value ?? 0)}</span>
          );
        },
      })),
      {
        accessorKey: 'totalIncome',
        header: 'Total',
        cell: ({ row }) => (
          <span className='font-semibold text-teal-800'>
            {formatCurrency(row.original.totalIncome)}
          </span>
        ),
      },
      {
        accessorKey: 'averageIncome',
        header: 'Média',
        cell: ({ row }) => (
          <span className='font-medium text-gray-700'>
            {formatCurrency(row.original.averageIncome)}
          </span>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className='bg-white p-6 rounded-2xl'>
        <div className='h-80 flex items-center justify-center'>
          <div className='animate-pulse text-gray-400'>
            Carregando análise...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
       <div className='p-6 rounded-2xl overflow-x-auto'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
          Resumo Renda
        </h3>
        <DataTable.Root
          data={incomeCategories.map((cat) => ({
            ...cat,
            type: 'income' as const,
          }))}
          columns={incomeColumns}
          isLoading={isLoading}
        >
          <DataTable.Content
            emptyStateProps={{
              emptyState: (
                <div className='text-center py-8 text-gray-500'>
                  Nenhuma entrada registrada neste ano
                </div>
              ),
            }}
          />
        </DataTable.Root>
      </div>

      <div className='bg-white p-6 rounded-2xl overflow-x-auto'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
          Resumo Despesas
        </h3>
        <DataTable.Root
          data={expenseCategories.map((cat) => ({
            ...cat,
            type: 'expense' as const,
          }))}
          columns={expenseColumns}
          isLoading={isLoading}
        >
          <DataTable.Content
            emptyStateProps={{
              emptyState: (
                <div className='text-center py-8 text-gray-500'>
                  Nenhuma saída registrada neste ano
                </div>
              ),
            }}
          />
        </DataTable.Root>
      </div>

     
    </div>
  );
}
