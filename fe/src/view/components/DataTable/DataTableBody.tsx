import { flexRender } from '@tanstack/react-table';
import { ComponentProps, memo } from 'react';

import { TableBody, TableCell, TableRow } from '@/view/components/Table';

import cn from '@/app/utils/cn';
import { useDataTable } from './DataTableContext';

interface ITableBodyProps extends ComponentProps<typeof TableBody> {
  loading?: boolean;
}

interface IDataTableBodyProps {
  tableBodyProps?: ITableBodyProps;
  tableRowProps?: ComponentProps<typeof TableRow>;
  tableCellProps?: ComponentProps<typeof TableCell>;
}

export function DataTableBody({
  tableBodyProps: { ...tableBodyPropsRest } = {},
  tableCellProps,
  tableRowProps,
}: IDataTableBodyProps) {
  const { table } = useDataTable();
  const { rows } = table.getRowModel();

  return (
    <TableBody {...tableBodyPropsRest}>
      {rows.map((row) => {
        const cells = row.getVisibleCells();

        return (
          <TableRow key={row.id} {...tableRowProps}>
            {cells.map((cell) => {
              return (
                <TableCell
                  key={cell.id}
                  style={{
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                  }}
                  className={cn(tableCellProps?.className)}
                  {...tableCellProps}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export const MemoizedDataTableBody = memo(DataTableBody);
