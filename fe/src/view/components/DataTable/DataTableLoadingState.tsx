import { ReactNode } from 'react';

import { TableBody, TableCell, TableRow } from '@/view/components/Table';

import { Skeleton } from '../Skeleton';
import { useDataTable } from './DataTableContext';

interface IDataTableLoadingStateProps {
  loadingState?: ReactNode;
  qtyOfPlaceholders?: number;
}

export function DataTableLoadingState({
  loadingState,
  qtyOfPlaceholders = 5,
}: IDataTableLoadingStateProps) {
  const { table, isLoading } = useDataTable();

  if (!isLoading) return null;

  return (
    <TableBody>
      {Array.from({ length: qtyOfPlaceholders }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={table.getFlatHeaders().length}>
            {loadingState ?? <Skeleton className="w-full h-10" />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
