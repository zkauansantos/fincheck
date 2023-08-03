import { useState } from "react";
import useDashboard from "../../useDashboard";

export default function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    sliderState,
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    isFiltersModalOpen,
    transactions: [],
    setSliderState,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
  };
}
