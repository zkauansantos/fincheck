import DashboardProvider, {
  DashBoardContext,
} from '@/app/contexts/DashboardContext';
import Logo from '@/view/components/Logo';
import UserMenu from '@/view/components/UserMenu';
import { Link } from 'react-router-dom';
import Accounts from './components/Accounts';
import Fab from './components/Fab';
import { FinancialResults } from './components/FinancialResults';
import Transactions from './components/Transactions';
import EditAccountModal from './modals/EditAccountModal';
import NewAccountModal from './modals/NewAccountModal';
import NewTransactionModal from './modals/NewTransactionModal';

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashBoardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className='h-full w-full p-4 md:pt-6 md:px-8 md:pb-8 flex flex-col gap-4'>
            <header className='flex items-center justify-between h-12'>
              <div className='flex items-center gap-6'>
                <Logo className='h-6 text-teal-900' />
                <nav className='flex gap-4'>
                  <Link
                    to='/'
                    className='text-sm font-medium text-teal-800 hover:text-teal-900 transition-colors'
                  >
                    Dashboard
                  </Link>
                  <Link
                    to='/analytics'
                    className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
                  >
                    Análise
                  </Link>
                </nav>
              </div>
              <UserMenu />
            </header>

            <main className='flex-1 flex flex-col gap-4 overflow-y-auto'>
              <FinancialResults />

              <div className='flex flex-col md:flex-row gap-4'>
                <div className='w-full md:w-1/2'>
                  <Accounts />
                </div>

                <div className='w-full md:w-1/2'>
                  <Transactions />
                </div>
              </div>
            </main>

            <Fab />
            {accountBeingEdited && <EditAccountModal />}
            <NewAccountModal />
            <NewTransactionModal />
          </div>
        )}
      </DashBoardContext.Consumer>
    </DashboardProvider>
  );
}
