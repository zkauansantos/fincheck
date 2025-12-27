import { TransactionType } from '@/app/entities/Transaction';
import { DropdownMenu } from '@/view/components/DropdownMenu';
import BankAccountIcon from '@/view/components/icons/BankAccountIcon';
import { CategoryIcon } from '@/view/components/icons/categories/CategoryIcon';
import { PlusIcon } from '@radix-ui/react-icons';
import useDashboard from '../../useDashboard';

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
            onSelect={() => openNewTransactionModal(TransactionType.INCOME)}
          >
            <CategoryIcon type='income' />
            <span>Nova Receita</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className='gap-2'
            onSelect={() => openNewTransactionModal(TransactionType.EXPENSE)}
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
