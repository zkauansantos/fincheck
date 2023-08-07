import React, { createContext, useCallback, useState } from "react";
import { BankAccount } from "../entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: "INCOME" | "EXPENSE" | null;
  toggleValuesVisibility: () => void;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  openNewTransactionModal: (type: "INCOME" | "EXPENSE") => void;
  closeNewTransactionModal: () => void;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  accountBeingEdited: null | BankAccount;
  isEditAccountModalOpen: boolean;
}

export const DashBoardContext = createContext({} as DashboardContextValue);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export default function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<null | BankAccount>(null);

  const [newTransactionType, setNewTransactionType] = useState<
    "INCOME" | "EXPENSE" | null
  >(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prev) => !prev);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false);
    setAccountBeingEdited(null);
  }, []);

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashBoardContext.Provider
      value={{
        areValuesVisible,
        newTransactionType,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        accountBeingEdited,
        closeEditAccountModal,
        isEditAccountModalOpen,
        openEditAccountModal,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
