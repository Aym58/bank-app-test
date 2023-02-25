import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { TransactionEntity } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { TransactionTypes } from './constant/transaction.types';

@Injectable()
export class TransactionService {
  constructor(
    private readonly bankService: BankService,
    private readonly categoryService: CategoryService,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    const { amount, type, bankId, categoriesId } = createTransactionDto;

    const bank = await this.bankService.getBankById(bankId);
    const categories = await this.categoryService.getCategoriesByIdArray(
      categoriesId,
    );

    type === TransactionTypes.CONSUMABLE
      ? (createTransactionDto.amount = -Math.abs(amount))
      : (createTransactionDto.amount = Math.abs(amount));

    const transaction = await TransactionRepository.createTransaction(
      createTransactionDto,
      bank,
      categories,
    );

    await this.bankService.updateBankBalance(bank);

    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
    };
  }

  async getAllTransactions(
    pagination: PaginationDto,
  ): Promise<GetTransactionDto[]> {
    try {
      const transactionList = await TransactionRepository.getAllTransactions(
        pagination,
      );
      return transactionList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteTransaction(transaction: TransactionEntity): Promise<void> {
    try {
      const { bank } = await TransactionRepository.findOne({
        relations: { bank: true },
        where: { id: transaction.id },
      });

      await transaction.remove();
      await this.bankService.updateBankBalance(bank);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
