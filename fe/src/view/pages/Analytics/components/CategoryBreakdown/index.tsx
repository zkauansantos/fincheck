import { MONTHS } from '@/app/config/constants';
import { TransactionType } from '@/app/entities/Transaction';
import useCategoryAnalytics from '@/app/services/categories/hooks/useCategoryAnalytics';
import { CategoryAnalytics } from '@/app/services/transactions/getCategoryAnalytics';
import cn from '@/app/utils/cn';
import formatCurrency from '@/app/utils/formatCurrency';
import { DataTable } from '@/view/components/DataTable';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<CategoryAnalytics>[] = [
  {
    accessorKey: 'categoryName',
    header: 'Categoria',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <span>
          <CategoryIcon
            type={
              row.original.type === TransactionType.INCOME
                ? 'income'
                : 'expense'
            }
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
    cell: ({ row }: { row: { original: CategoryAnalytics } }) => {
      const value = row.original.months[index];

      const color =
        value === 0
          ? 'text-gray-700'
          : row.original.type === TransactionType.INCOME
          ? 'text-teal-800'
          : 'text-red-800';

      return <span className={color}>{formatCurrency(value ?? 0)}</span>;
    },
  })),
  {
    header: 'Total',
    cell: ({ row }) => {
      const bgcolor =
        row.original.type === TransactionType.INCOME
          ? 'text-teal-800'
          : 'text-red-800';

      return (
        <span className={cn('font-semibold', bgcolor)}>
          {formatCurrency(
            row.original.type === TransactionType.EXPENSE
              ? row.original.totalExpense
              : row.original.totalIncome
          )}
        </span>
      );
    },
  },
  {
    header: 'Média',
    cell: ({ row }) => (
      <span className='font-medium text-gray-700'>
        {formatCurrency(
          row.original.type === TransactionType.EXPENSE
            ? row.original.averageExpense
            : row.original.averageIncome
        )}
      </span>
    ),
  },
];

interface CategoryBreakdownProps {
  year: number;
}

export function CategoryBreakdown({ year }: CategoryBreakdownProps) {
  const { incomingCategories, expenseCategories, isLoading } =
    useCategoryAnalytics({ year });

  if (isLoading) {
    return (
      <div className='p-6 rounded-2xl'>
        <div className='h-80 flex items-center justify-center'>
          <div className='animate-pulse text-gray-400'>
            Carregando Resumo...
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
          data={incomingCategories}
          columns={columns}
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

      <div className=' p-6 rounded-2xl overflow-x-auto'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
          Resumo Despesas
        </h3>

        <DataTable.Root
          data={expenseCategories}
          columns={columns}
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
