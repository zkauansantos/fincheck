import DashboardProvider, {
  DashBoardContext,
} from '@/app/contexts/DashboardContext';
import { Header } from '@/view/components/Header';
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
          <Header />

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
