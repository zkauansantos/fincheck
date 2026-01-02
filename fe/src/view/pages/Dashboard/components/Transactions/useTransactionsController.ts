import { Transaction } from "@/app/entities/Transaction";
import { GetAllTransactionsParams } from "@/app/services/transactions/getAll";
import useTransactions from "@/app/services/transactions/hooks/useTransactions";
import { useState } from "react";
import useDashboard from "../../useDashboard";

export default function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [filters, setFilters] = useState<GetAllTransactionsParams>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading } =
    useTransactions(filters);



  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setTransactionBeingEdited(null);
    setIsEditModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof GetAllTransactionsParams>(
    filter: TFilter
  ) {
    return (value: GetAllTransactionsParams[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prev) => ({
        ...prev,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  return {
    sliderState,
    areValuesVisible,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    transactions,
    isEditModalOpen,
    filters,
    transactionBeingEdited,
    setSliderState,
    handleApplyFilters,
    handleChangeFilters,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}
