import { useState } from "react";
import useDashboard from "../../useDashboard";

export default function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [''],
    setSliderState,
  };
}
