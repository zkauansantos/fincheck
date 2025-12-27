import { Transaction } from '../entities/transaction.entity';
import { TransactionType } from '../enums/transaction-type.enum';

export interface TransactionFilters {
  userId: string;
  bankAccountId?: string;
  categoryId?: string;
  subcategoryId?: string;
  type?: TransactionType;
  startDate?: Date;
  endDate?: Date;
  month?: number;
  year?: number;
}

export interface TransactionRepository {
  findById(id: string): Promise<Transaction | null>;

  findByIdAndUserId(id: string, userId: string): Promise<Transaction | null>;

  findAll(filters: TransactionFilters): Promise<Transaction[]>;

  findByBankAccountId(bankAccountId: string): Promise<Transaction[]>;

  findByCategoryId(categoryId: string): Promise<Transaction[]>;

  findBySubcategoryId(subcategoryId: string): Promise<Transaction[]>;

  findByDateRange(filters: {
    userId: string;
    startDate: Date;
    endDate: Date;
    bankAccountId?: string;
  }): Promise<Transaction[]>;

  findByMonth(
    userId: string,
    year: number,
    month: number,
    bankAccountId?: string,
  ): Promise<Transaction[]>;

  findByAnalytics(params: {
    userId: string;
    year: number;
    bankAccountId?: string;
  }): Promise<Transaction[]>;

  save(transaction: Transaction): Promise<Transaction>;

  update(transaction: Transaction): Promise<Transaction>;

  delete(id: string): Promise<void>;

  countByUserId(userId: string): Promise<number>;

  countByBankAccountId(bankAccountId: string): Promise<number>;

  sumByBankAccountId(bankAccountId: string): Promise<number>;

  sumIncomeByBankAccountId(bankAccountId: string): Promise<number>;

  sumExpenseByBankAccountId(bankAccountId: string): Promise<number>;
}
