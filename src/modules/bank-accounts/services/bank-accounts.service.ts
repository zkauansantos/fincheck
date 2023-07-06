import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bankAccounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnerService } from './validate-bank-account-owner.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnerService: ValidateBankAccountOwnerService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, name, initialBalance, type } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        userId,
        name,
        color,
        initialBalance,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnerService.validate(bankAccountId, userId);

    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async delete(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnerService.validate(bankAccountId, userId);

    return this.bankAccountsRepository.delete({
      where: { id: bankAccountId },
    });
  }
}
