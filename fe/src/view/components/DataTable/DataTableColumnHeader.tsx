import cn from '@/app/utils/cn';
import { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { ReactNode } from 'react';

interface IDataTableColumnHeaderProps<T> {
  column: Column<T>;
  title: ReactNode;
  className?: string;
}

export function DataTableColumnHeader<T>({
  column,
  title,
  className,
}: IDataTableColumnHeaderProps<T>) {
  if (!column.getCanSort()) {
    return <span className='text-xs'>{title}</span>;
  }

  return (
    <button
      type='button'
      className={cn(
        'flex items-center text-xs gap-2',
        column.getCanSort() && 'cursor-pointer',
        className
      )}
      onClick={() => column.toggleSorting()}
    >
      {title}

      {!column.getIsSorted() && <ChevronsUpDown className='size-4' />}
      {column.getIsSorted() === 'asc' && <ChevronUp className='size-4' />}
      {column.getIsSorted() === 'desc' && <ChevronDown className='size-4' />}
    </button>
  );
}
