import { Injectable } from '@nestjs/common';

import { TransactionEntity } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly bankService: BankService,
    private readonly categoryService: CategoryService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    const { bankId, categoriesId } = createTransactionDto;

    const bank = await this.bankService.getBankById(bankId);

    const categories = await this.categoryService.getCategoriesByIdArray(
      categoriesId,
    );

    const transaction = await TransactionRepository.createTransaction(
      createTransactionDto,
      bank,
      categories,
    );

    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      bank: transaction.bank,
      categories: transaction.categories,
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
