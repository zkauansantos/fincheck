import { ComponentProps, useMemo } from 'react';

import { Table } from '@/view/components/Table';

import { DataTableBody, MemoizedDataTableBody } from './DataTableBody';
import { useDataTable } from './DataTableContext';
import { DataTableEmptyState } from './DataTableEmptyState';
import { DataTableHeader } from './DataTableHeader';
import { DataTableLoadingState } from './DataTableLoadingState';

interface IDataTableContentProps {
  tableHeaderProps?: ComponentProps<typeof DataTableHeader>;
  tableBodyProps?: ComponentProps<typeof DataTableBody>;
  loadingStateProps?: ComponentProps<typeof DataTableLoadingState>;
  emptyStateProps?: ComponentProps<typeof DataTableEmptyState>;
}

export function DataTableContent({
  tableBodyProps,
  tableHeaderProps,
  loadingStateProps,
  emptyStateProps,
}: IDataTableContentProps) {
  const { table, isLoading, hasData } = useDataTable();

  const { columnSizingInfo, columnSizing } = table.getState();

  const colSizesVariables = useMemo(
    () =>
      table.getFlatHeaders().reduce<Record<string, number>>((acc, header) => {
        acc[`--header-${header.id}-size`] = header.getSize();
        acc[`--col-${header.column.id}-size`] = header.column.getSize();
        return acc;
      }, {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnSizingInfo, columnSizing, table.getFlatHeaders],
  );

  return (
    <Table style={colSizesVariables}>
      <DataTableHeader {...tableHeaderProps} />

      <DataTableLoadingState {...loadingStateProps} />

      {!hasData && !isLoading && <DataTableEmptyState {...emptyStateProps} />}

      {columnSizingInfo.isResizingColumn && hasData && !isLoading && (
        <MemoizedDataTableBody {...tableBodyProps} />
      )}

      {!columnSizingInfo.isResizingColumn && hasData && !isLoading && (
        <DataTableBody {...tableBodyProps} />
      )}
    </Table>
  );
}
