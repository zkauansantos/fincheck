import { BankAccountType } from '../../../../domain/enums/bank-account-type.enum';

export interface UpdateBankAccountUseCaseOutput {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
}
