import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';
import { BankEntity } from '../bank/bank.entity';
import { CategoryEntity } from '../category/category.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

export const TransactionRepository = dataSource
  .getRepository(TransactionEntity)
  .extend({
    async createTransaction(
      createTransactionDto: CreateTransactionDto,
      bank: BankEntity,
      categories: CategoryEntity[],
    ): Promise<TransactionEntity> {
      const { amount, type } = createTransactionDto;
      const transaction = new TransactionEntity();
      transaction.amount = amount;
      transaction.type = type;
      transaction.bank = bank;
      transaction.categories = categories;
      await transaction.save();
      return transaction;
    },

    async getAllTransactions(
      paginationDto: PaginationDto,
    ): Promise<GetTransactionDto[]> {
      const { page, limit } = paginationDto;
      const take = limit;
      const skip = (page - 1) * limit;
      const query = await this.createQueryBuilder('transaction')
        .addOrderBy('transaction.id', 'ASC')
        .leftJoin('transaction.bank', 'bank')
        .leftJoin('transaction.categories', 'category')
        .skip(skip)
        .take(take)
        .select(['transaction.id', 'transaction.amount', 'transaction.type'])
        .getMany();
      return query;
    },
  });
