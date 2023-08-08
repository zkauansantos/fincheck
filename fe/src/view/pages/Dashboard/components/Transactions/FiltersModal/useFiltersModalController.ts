import { useState } from "react";
import useBankAccounts from "../../../../../../app/hooks/useBankAccounts";

export default function useFitlersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { accounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prev) =>
      prev === bankAccountId ? undefined : bankAccountId
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prev) => prev + step);
  }

  return {
    handleSelectBankAccount,
    handleChangeYear,
    accounts,
    selectedBankAccountId,
    selectedYear,
  };
}
