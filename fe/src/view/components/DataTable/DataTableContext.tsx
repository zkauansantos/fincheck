/* eslint-disable @typescript-eslint/no-explicit-any  */
import { Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

interface IDataTableContextValue {
  table: Table<any>;
  isLoading?: boolean;
  hasData: boolean;
  isManualPagination: boolean;
}

export const DataTableContext = createContext({} as IDataTableContextValue);

// eslint-disable-next-line
export function useDataTable() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }

  return context;
}
