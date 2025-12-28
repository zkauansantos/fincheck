import { BankAccountType } from '../../../../domain/enums/bank-account-type.enum';

export type ListBankAccountsUseCaseOutput = {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}[];
