import { ReactNode } from 'react';

import { TableBody, TableCell, TableRow } from '@/view/components/Table';

import { useDataTable } from './DataTableContext';

interface IDataTableEmptyStateProps {
  emptyState?: ReactNode;
}

export function DataTableEmptyState({ emptyState }: IDataTableEmptyStateProps) {
  const { table } = useDataTable();

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={table.getFlatHeaders().length}>
          {emptyState}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
