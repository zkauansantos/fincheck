import { useMemo, useState } from "react";
import useWidth from "../../../../../app/hooks/useWidth";
import useDashboard from "../../useDashboard";
import useBankAccounts from "../../../../../app/hooks/useBankAccounts";

export default function useAccountsController() {
  const width = useWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );
  }, [accounts]);

  return {
    areValuesVisible,
    width,
    sliderState,
    openNewAccountModal,
    setSliderState,
    toggleValuesVisibility,
    isLoading: isFetching,
    currentBalance,
    accounts,
  };
}
