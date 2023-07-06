import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bankAccounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  create(createBankAccountDto: any) {
    return this.bankAccountsRepository.create(createBankAccountDto);
  }

  findAll(findManyAccountDto: any) {
    return this.bankAccountsRepository.create(findManyAccountDto);
  }

  findOne(findUniqueBankAccountDto: any) {
    return this.bankAccountsRepository.create(findUniqueBankAccountDto);
  }

  update(updateBankAccountDto: any) {
    return this.bankAccountsRepository.create(updateBankAccountDto);
  }

  delete(deleteBankAccountDto: any) {
    return this.bankAccountsRepository.create(deleteBankAccountDto);
  }
}
