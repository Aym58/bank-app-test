import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';
import { BankEntity } from '../bank/bank.entity';
import { CategoryEntity } from '../category/category.entity';

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

    async getAllTransactions(): Promise<GetTransactionDto[]> {
      const query = this.createQueryBuilder('transaction')
        .addOrderBy('transaction.id', 'DESC')
        .leftJoin('transaction.bank', 'bank')
        .leftJoin('transaction.categories', 'category')
        .select([
          'transaction.id',
          'transaction.amount',
          'transaction.type',
          'bank.id',
          'category.id',
        ])
        .getMany();

      return query;
    },
  });
