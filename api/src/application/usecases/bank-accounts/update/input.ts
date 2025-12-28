export interface UpdateBankAccountUseCaseInput {
  bankAccountId: string;
  userId: string;
  name: string;
  initialBalance: number;
  color: string;
}
