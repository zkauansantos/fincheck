export enum BankAccountType {
  CHECKING = 'CHECKING',
  CASH = 'CASH',
  INVESTMENT = 'INVESTMENT',
}

export class BankAccountTypeValidator {
  static isValid(type: string): boolean {
    return Object.values(BankAccountType).includes(type as BankAccountType);
  }

  static validate(type: string): void {
    if (!this.isValid(type)) {
      throw new Error(
        `Invalid bank account type: ${type}. Must be CHECKING, CASH, or INVESTMENT.`,
      );
    }
  }

  static isChecking(type: BankAccountType): boolean {
    return type === BankAccountType.CHECKING;
  }

  static isCash(type: BankAccountType): boolean {
    return type === BankAccountType.CASH;
  }

  static isInvestment(type: BankAccountType): boolean {
    return type === BankAccountType.INVESTMENT;
  }
}
