import { useState } from 'react';

export function useAnalyticsController() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return {
    selectedYear,
    setSelectedYear,
  };
}
