import { Settings2Icon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/dropdown-menu';

import Button from '../Button';
import { useDataTable } from './DataTableContext';

export function DataTableColumnsVisibilityDropdown() {
  const { table } = useDataTable();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <Settings2Icon /> Visualizar
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {table.getAllColumns().map(
          (column) =>
            column.getCanHide() && (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={() => column.toggleVisibility()}
              >
                {column.columnDef.meta?.nameInFilters}
              </DropdownMenuCheckboxItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
