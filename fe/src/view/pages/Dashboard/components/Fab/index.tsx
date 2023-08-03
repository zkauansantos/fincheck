import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import BankAccountIcon from "../../../../components/icons/BankAccountIcon";
import useDashboard from "../../useDashboard";

export default function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className='fixed right-4 bottom-4'>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className='bg-teal-900 text-white rounded-full flex items-center justify-center h-12 w-12'>
            <PlusIcon className='w-6 h-6' />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className='mr-12'>
          <DropdownMenu.Item
            className='gap-2'
            onSelect={() => openNewTransactionModal("INCOME")}
          >
            <CategoryIcon type='income' />
            <span>Nova Receita</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='gap-2'
            onSelect={() => openNewTransactionModal("EXPENSE")}
          >
            <CategoryIcon type='expense' />
            <span>Nova Despesa</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className='gap-2' onSelect={openNewAccountModal}>
            <BankAccountIcon />
            <span>Nova Conta</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
