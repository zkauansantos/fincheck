import { BankAccount } from '../entities/bank-account.entity';

export interface BankAccountRepository {
  findById(id: string): Promise<BankAccount | null>;

  findByIdAndUserId(id: string, userId: string): Promise<BankAccount | null>;

  findAllByUserId(userId: string): Promise<BankAccount[]>;

  save(bankAccount: BankAccount): Promise<BankAccount>;

  update(bankAccount: BankAccount): Promise<BankAccount>;

  delete(id: string): Promise<void>;

  countByUserId(userId: string): Promise<number>;
}
