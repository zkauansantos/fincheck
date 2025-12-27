import { ChevronLeft, ChevronRight } from 'lucide-react';

import Button from '../Button';
import Select from '../Select';
import { useDataTable } from './DataTableContext';

export function DataTablePagination() {
  const { isLoading, hasData, table, isManualPagination } = useDataTable();

  if (isLoading || !hasData) return null;

  const { pageSize } = table.getState().pagination;
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  const totalRows = isManualPagination
    ? pageCount * pageSize || table.getPrePaginationRowModel().rows.length
    : table.getPrePaginationRowModel().rows.length;

  const startIndex = Math.ceil(pageIndex) * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className='flex items-center justify-between mt-4'>
      <div className='flex items-center flex-1 gap-4'>
        <small className='hidden sm:block text-sm text-gray-600 leading-5 font-normal'>
          Exibindo de {startIndex} a {endIndex} de {totalRows} resultados
        </small>

        <div className='flex-1'>
          <Select
            options={[
              {
                label: '5',
                value: '5',
              },
              {
                label: '10',
                value: '10',
              },
              {
                label: '25',
                value: '25',
              },
              {
                label: '50',
                value: '50',
              },
              {
                label: '100',
                value: '100',
              },
            ]}
            value={table.getState().pagination.pageSize.toString()}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
          />
        </div>
      </div>

      <div className='flex items-center gap-3 w-full md:w-fit justify-end'>
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          type='button'
          variant='ghost'
          className='text-sm leading-5 font-semibold'
        >
          <ChevronLeft />
        </Button>

        <Button
          type='button'
          variant='ghost'
          className='text-sm leading-5 font-semibold'
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
