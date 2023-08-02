import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import BankAccountIcon from "../../../../components/icons/BankAccountIcon";

export default function Fab() {
  return (
    <div className='fixed right-4 bottom-4'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='bg-teal-900 text-white rounded-full flex items-center justify-center h-12 w-12'>
            <PlusIcon className='w-6 h-6' />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="mr-12">
          <DropdownMenu.Item className='gap-2'>
            <CategoryIcon type='expense' />
            <span>Nova Receita</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='gap-2'>
            <CategoryIcon type='income' />
            <span>Nova Despesa</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='gap-2'>
            <BankAccountIcon />
            <span>Nova Conta</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
