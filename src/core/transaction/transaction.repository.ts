import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';

export const TransactionRepository = dataSource
  .getRepository(TransactionEntity)
  .extend({
    async createTransaction(
      createTransactionDto: CreateTransactionDto,
    ): Promise<TransactionEntity> {
      const { amount, type } = createTransactionDto;

      const transaction = new TransactionEntity();
      transaction.amount = amount;
      transaction.type = type;
      await transaction.save();
      return transaction;
    },

    async getAllTransactions(): Promise<GetTransactionDto[]> {
      const query = this.createQueryBuilder('transaction');
      query.addOrderBy('transaction.id', 'DESC');
      query.select([
        'transaction.id',
        'transaction.amount',
        'transaction.type',
      ]);
      return query.getMany();
    },
  });
