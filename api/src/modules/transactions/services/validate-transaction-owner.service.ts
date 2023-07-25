import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.respositories';

@Injectable()
export class ValidateTransactionOwnerService {
  constructor(private readonly trasactionsRepository: TransactionsRepository) {}

  public async validate(transactionId: string, userId: string) {
    const isOwner = await this.trasactionsRepository.findFirst({
      where: { id: transactionId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction Id not found.');
    }
  }
}
