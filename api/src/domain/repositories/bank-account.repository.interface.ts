import { BankAccount } from '../entities/bank-account.entity';
import { BankAccountType } from '../enums/bank-account-type.enum';

export type BankAccountWithBalance = {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
};

export interface BankAccountRepository {
  findById(id: string): Promise<BankAccount | null>;
  findAll(userId: string): Promise<BankAccount[]>;
  findAllWithBalance(userId: string): Promise<BankAccountWithBalance[]>;
  save(bankAccount: BankAccount): Promise<BankAccount>;
  update(bankAccount: BankAccount): Promise<BankAccount>;
  delete(id: string): Promise<void>;
}
