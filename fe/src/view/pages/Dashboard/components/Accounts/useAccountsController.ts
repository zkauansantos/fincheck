import { useState } from "react";
import useWidth from "../../../../../app/hooks/useWidth";
import useDashboard from "../../useDashboard";

export default function useAccountsController() {
  const width = useWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    areValuesVisible,
    width,
    sliderState,
    setSliderState,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [''],
  };
}
