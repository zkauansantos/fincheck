import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { ReactNode } from 'react';

import { LIMIT_PAGINATION } from '@/app/config/constants';

import { DataTableColumnsVisibilityDropdown } from './DataTableColumnsVisibilityDropdown';
import { DataTableContent } from './DataTableContent';
import { DataTableContext } from './DataTableContext';
import { DataTablePagination } from './DataTablePagination';
import { DataTableTextFilter } from './DataTableTextFilter';

export type IDataTablePagination = PaginationState & {
  onChangePagination: OnChangeFn<PaginationState>;
};

interface IDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  children: ReactNode;
  isLoading?: boolean;
  pagination?: PaginationState & {
    total?: number;
    onPaginationChange: OnChangeFn<PaginationState>;
  };
  initialState?: InitialTableState;
}

function DataTableRoot<TData>({
  columns,
  data,
  children,
  isLoading,
  pagination: paginationProps,
  initialState,
}: IDataTableProps<TData>) {
  const { onPaginationChange, total, pageIndex, pageSize } =
    paginationProps ?? {
      pageIndex: 0,
      pageSize: LIMIT_PAGINATION,
    };

  const paginationConfig = {
    ...(paginationProps
      ? {
          state: {
            pagination: {
              pageIndex,
              pageSize,
            },
          },
          pageCount: (total ?? 0) / (paginationProps?.pageSize ?? 0),
          onPaginationChange,
          manualPagination: true,
        }
      : {
          initialState: {
            pagination: {
              pageIndex: 0,
              pageSize: LIMIT_PAGINATION,
            },
          },
          getPaginationRowModel: getPaginationRowModel(),
          manualPagination: false,
        }),
  };

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: false,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState,
    ...paginationConfig,
  });

  const { rows } = table.getRowModel();

  const hasData = rows.length > 0;

  return (
    <DataTableContext.Provider
      value={{
        table,
        isLoading,
        hasData,
        isManualPagination: !!paginationProps,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export const DataTable = {
  Root: DataTableRoot,
  Content: DataTableContent,
  ColumnsVisibilityDropdown: DataTableColumnsVisibilityDropdown,
  TextFilter: DataTableTextFilter,
  Pagination: DataTablePagination,
};
