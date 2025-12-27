import { MONTHS } from '@/app/config/constants';
import useCategoryAnalytics from '@/app/services/categories/hooks/useCategoryAnalytics';
import formatCurrency from '@/app/utils/formatCurrency';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/view/components/Tabs';

interface CategoryBreakdownProps {
  year: number;
}

export function CategoryBreakdown({ year }: CategoryBreakdownProps) {
  const { categoryAnalytics, isLoading } = useCategoryAnalytics({ year });

  const incomeCategories = categoryAnalytics.filter(
    (cat) => cat.totalIncome > 0
  );
  const expenseCategories = categoryAnalytics.filter(
    (cat) => cat.totalExpense > 0
  );

  const totalIncome = incomeCategories.reduce(
    (sum, cat) => sum + cat.totalIncome,
    0
  );
  const totalExpense = expenseCategories.reduce(
    (sum, cat) => sum + cat.totalExpense,
    0
  );
  const averageMonthlyIncome = totalIncome / 12;
  const averageMonthlyExpense = totalExpense / 12;

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
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-teal-50 p-6 rounded-2xl'>
          <span className='text-teal-800 text-sm font-medium tracking-[-0.5px]'>
            Total Anual - Entradas
          </span>
          <p className='text-2xl font-bold text-teal-800 mt-1 tracking-[-1px]'>
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className='bg-teal-50 p-6 rounded-2xl'>
          <span className='text-teal-800 text-sm font-medium tracking-[-0.5px]'>
            Média Mensal - Entradas
          </span>
          <p className='text-2xl font-bold text-teal-800 mt-1 tracking-[-1px]'>
            {formatCurrency(averageMonthlyIncome)}
          </p>
        </div>
        <div className='bg-red-50 p-6 rounded-2xl'>
          <span className='text-red-800 text-sm font-medium tracking-[-0.5px]'>
            Total Anual - Saídas
          </span>
          <p className='text-2xl font-bold text-red-800 mt-1 tracking-[-1px]'>
            {formatCurrency(totalExpense)}
          </p>
        </div>
        <div className='bg-red-50 p-6 rounded-2xl'>
          <span className='text-red-800 text-sm font-medium tracking-[-0.5px]'>
            Média Mensal - Saídas
          </span>
          <p className='text-2xl font-bold text-red-800 mt-1 tracking-[-1px]'>
            {formatCurrency(averageMonthlyExpense)}
          </p>
        </div>
      </div>

      <Tabs defaultValue='expenses'>
        <TabsList>
          <TabsTrigger value='expenses'>Saídas por Categoria</TabsTrigger>
          <TabsTrigger value='income'>Entradas por Categoria</TabsTrigger>
        </TabsList>

        <TabsContent value='expenses'>
          <div className='bg-white p-6 rounded-2xl overflow-x-auto'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
              Detalhamento de Saídas por Categoria
            </h3>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left py-3 px-2 font-semibold text-gray-700'>
                    Categoria
                  </th>
                  {MONTHS.map((month) => (
                    <th
                      key={month}
                      className='text-right py-3 px-2 font-semibold text-gray-700'
                    >
                      {month}
                    </th>
                  ))}
                  <th className='text-right py-3 px-2 font-semibold text-gray-700'>
                    Total
                  </th>
                  <th className='text-right py-3 px-2 font-semibold text-gray-700'>
                    Média
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenseCategories.length === 0 ? (
                  <tr>
                    <td colSpan={14} className='text-center py-8 text-gray-500'>
                      Nenhuma saída registrada neste ano
                    </td>
                  </tr>
                ) : (
                  expenseCategories.map((category) => (
                    <tr
                      key={category.categoryId}
                      className='border-b border-gray-100 hover:bg-gray-50'
                    >
                      <td className='py-3 px-2'>
                        <div className='flex items-center gap-2'>
                          <span>
                            <CategoryIcon
                              type='expense'
                              category={category.categoryIcon}
                            />
                          </span>
                          <span className='font-medium text-gray-900'>
                            {category.categoryName}
                          </span>
                        </div>
                      </td>
                      {category.months.map((value, index) => (
                        <td key={index} className='text-right py-3 px-2'>
                          {value > 0 ? (
                            <span className='text-gray-700'>
                              {formatCurrency(value)}
                            </span>
                          ) : (
                            <span className='text-gray-300'>-</span>
                          )}
                        </td>
                      ))}
                      <td className='text-right py-3 px-2 font-semibold text-red-800'>
                        {formatCurrency(category.totalExpense)}
                      </td>
                      <td className='text-right py-3 px-2 font-medium text-gray-700'>
                        {formatCurrency(category.averageExpense)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value='income'>
          <div className='bg-white p-6 rounded-2xl overflow-x-auto'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4 tracking-[-0.5px]'>
              Detalhamento de Entradas por Categoria
            </h3>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200'>
                  <th className='text-left py-3 px-2 font-semibold text-gray-700'>
                    Categoria
                  </th>
                  {MONTHS.map((month) => (
                    <th
                      key={month}
                      className='text-right py-3 px-2 font-semibold text-gray-700'
                    >
                      {month}
                    </th>
                  ))}
                  <th className='text-right py-3 px-2 font-semibold text-gray-700'>
                    Total
                  </th>
                  <th className='text-right py-3 px-2 font-semibold text-gray-700'>
                    Média
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeCategories.length === 0 ? (
                  <tr>
                    <td colSpan={14} className='text-center py-8 text-gray-500'>
                      Nenhuma entrada registrada neste ano
                    </td>
                  </tr>
                ) : (
                  incomeCategories.map((category) => (
                    <tr
                      key={category.categoryId}
                      className='border-b border-gray-100 hover:bg-gray-50'
                    >
                      <td className='py-3 px-2'>
                        <div className='flex items-center gap-2'>
                          <span>
                            <CategoryIcon
                              type='income'
                              category={category.categoryIcon}
                            />
                          </span>
                          <span className='font-medium text-gray-900'>
                            {category.categoryName}
                          </span>
                        </div>
                      </td>
                      {category.months.map((value, index) => (
                        <td key={index} className='text-right py-3 px-2'>
                          {value > 0 ? (
                            <span className='text-gray-700'>
                              {formatCurrency(value)}
                            </span>
                          ) : (
                            <span className='text-gray-300'>-</span>
                          )}
                        </td>
                      ))}
                      <td className='text-right py-3 px-2 font-semibold text-teal-800'>
                        {formatCurrency(category.totalIncome)}
                      </td>
                      <td className='text-right py-3 px-2 font-medium text-gray-700'>
                        {formatCurrency(category.averageIncome)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
