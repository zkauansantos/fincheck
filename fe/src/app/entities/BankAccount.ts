export enum BankAccountType {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH"
}

export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}
