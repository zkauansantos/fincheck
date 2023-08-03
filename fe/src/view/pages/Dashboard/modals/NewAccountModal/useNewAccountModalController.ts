import useDashboard from "../../useDashboard";

export default function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useDashboard();

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
