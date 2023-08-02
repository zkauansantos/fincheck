import { useState } from "react";

export default function useFitlersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    null | string
  >(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prev) =>
      prev === bankAccountId ? null : bankAccountId
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prev) => prev + step);
  }

  return {
    handleSelectBankAccount,
    handleChangeYear,
    selectedBankAccountId,
    selectedYear,
  };
}
