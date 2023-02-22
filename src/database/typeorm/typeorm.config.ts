import { ConfigService } from '@nestjs/config';

import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { BankEntity } from 'src/core/bank/bank.entity';

config();
const configService = new ConfigService();

const Entities = [BankEntity];

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DB_URI'),
  entities: Entities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: true,
};
