import { Injectable } from '@nestjs/common';

import { TransactionEntity } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    const transaction = await TransactionRepository.createTransaction(
      createTransactionDto,
    );
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
    };
  }

  async getAllTransactions(): Promise<GetTransactionDto[]> {
    const response = await TransactionRepository.getAllTransactions();
    return response;
  }

  async deleteTransaction(Transaction: TransactionEntity): Promise<void> {
    await Transaction.remove();
  }
}
