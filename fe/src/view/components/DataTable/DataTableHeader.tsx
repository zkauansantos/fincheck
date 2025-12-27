import { flexRender } from '@tanstack/react-table';
import { ComponentProps } from 'react';

import { TableHead, TableHeader, TableRow } from '@/view/components/Table';

import cn from '@/app/utils/cn';
import { useDataTable } from './DataTableContext';

interface ITableHeaderProps {
  tableHeaderProps?: ComponentProps<typeof TableHeader>;
  tableRowProps?: ComponentProps<typeof TableRow>;
  tableHeadProps?: ComponentProps<typeof TableHead>;
}

export function DataTableHeader({
  tableHeaderProps,
  tableRowProps,
  tableHeadProps,
}: ITableHeaderProps) {
  const { table } = useDataTable();

  return (
    <TableHeader {...tableHeaderProps}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} {...tableRowProps}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: `calc(var(--header-${header.id}-size) * 1px)`,
              }}
              className="font-semibold"
              {...tableHeadProps}
            >
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.header, header.getContext())}

              {header.column.getCanResize() && (
                <div
                  className={cn(
                    'absolute right-0 h-full bg-black/10 w-1.5 top-0 cursor-col-resize opacity-0 group-hover:opacity-100 transition-all duration-300',
                    header.column.getIsResizing() && 'opactiy-100 bg-black',
                  )}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
