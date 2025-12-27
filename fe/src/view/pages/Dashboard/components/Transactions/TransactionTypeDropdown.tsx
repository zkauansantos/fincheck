import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "@/view/components/icons/TransactionsIcon";
import { DropdownMenu } from "@/view/components/DropdownMenu";
import { CategoryIcon } from "@/view/components/icons/categories/CategoryIcon";
import TransactionsIconFilter from "@/view/components/icons/TransactionsIconFilter";
import { ExpensesIcon } from "@/view/components/icons/ExpensesIcon";
import { IncomeIcon } from "@/view/components/icons/IncomeIcon";

interface TransactionTypeDropdownProps {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectedType: "INCOME" | "EXPENSE" | undefined;
}

export default function TransactionTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className='flex items-center gap-2'>
          {selectedType === "EXPENSE" && <ExpensesIcon />}
          {selectedType === "INCOME" && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className='text-sm text-gray-800 tracking-[-0.5px] font-medium'>
            {selectedType === "EXPENSE" && "Despesas"}
            {selectedType === "INCOME" && "Receitas"}
            {selectedType === undefined && "Transações"}
          </span>
          <ChevronDownIcon className='text-gray-900' />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className='w-[280px] ml-36 mt-2'>
        <DropdownMenu.Item
          className='gap-2'
          onSelect={() => onSelect("INCOME")}
        >
          <CategoryIcon type='income' />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className='gap-2'
          onSelect={() => onSelect("EXPENSE")}
        >
          <CategoryIcon type='expense' />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className='gap-2'
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIconFilter />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
