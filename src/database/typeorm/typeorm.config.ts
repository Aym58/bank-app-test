import { ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { BankEntity } from 'src/core/bank/bank.entity';
import { CategoryEntity } from 'src/core/category/category.entity';
import { TransactionEntity } from 'src/core/transaction/transaction.entity';

config();
const configService = new ConfigService();

const Entities = [BankEntity, CategoryEntity, TransactionEntity];

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URI'),
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: true,
};
