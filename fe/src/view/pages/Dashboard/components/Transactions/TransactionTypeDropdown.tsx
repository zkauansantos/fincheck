import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import TransactionsIconFilter from "../../../../components/icons/TransactionsIconFilter";

export default function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2'>
          <TransactionsIcon />

          <span className='text-sm text-gray-800 tracking-[-0.5px] font-medium'>
            Transações
          </span>
          <ChevronDownIcon className='text-gray-900' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className='w-[280px] ml-36    mt-2'>
        <DropdownMenu.Item className='gap-2'>
          <CategoryIcon type='income' />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-2'>
          <CategoryIcon type='expense' />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className='gap-2'>
          <TransactionsIconFilter />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
