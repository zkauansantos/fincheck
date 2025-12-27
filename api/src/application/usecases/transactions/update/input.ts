export interface UpdateTransactionUseCaseInput {
  transactionId: string;
  userId: string;
  name?: string;
  value?: number;
  date?: Date;
  bankAccountId?: string;
  categoryId?: string;
  subcategoryId?: string;
}
