import DashboardProvider, {
  DashBoardContext,
} from "../../../app/contexts/DashboardContext";
import Logo from "../../components/Logo";
import UserMenu from "../../components/UserMenu";
import Accounts from "./components/Accounts";
import Fab from "./components/Fab";
import Transactions from "./components/Transactions";
import EditAccountModal from "./modals/EditAccountModal";
import NewAccountModal from "./modals/NewAccountModal";
import NewTransactionModal from "./modals/NewTransactionModal";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashBoardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className='h-full w-full p-4 md:pt-6 md:px-8 md:pb-8 flex flex-col gap-4'>
            <header className='flex items-center justify-between h-12'>
              <Logo className='h-6 text-teal-900' />
              <UserMenu />
            </header>

            <main className='flex-1 flex flex-col md:flex-row gap-4 max-h-[92%]'>
              <div className='w-full md:w-1/2'>
                <Accounts />
              </div>

              <div className='w-full md:w-1/2'>
                <Transactions />
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
