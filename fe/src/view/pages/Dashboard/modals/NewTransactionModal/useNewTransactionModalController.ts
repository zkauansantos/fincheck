import useDashboard from "../../useDashboard";

export default function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  };
}
