import { ComponentProps } from 'react';

import Input from '../Input';
import { useDataTable } from './DataTableContext';

interface IDataTableTextFilterProps {
  inputProps?: ComponentProps<typeof Input>;
  column?: string;
}

export function DataTableTextFilter({
  inputProps,
  column,
}: IDataTableTextFilterProps) {
  const { table } = useDataTable();

  if (column) {
    const tableColumn = table.getColumn(column);
    const value = tableColumn?.getFilterValue() as string | undefined;

    return (
      <Input
        name={inputProps?.name ?? Math.random().toString()}
        {...inputProps}
        value={value ?? ''}
        onChange={(e) => tableColumn?.setFilterValue(e.target.value)}
      />
    );
  }

  return (
    <Input
      name={inputProps?.name ?? Math.random().toString()}
      {...inputProps}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
    />
  );
}
