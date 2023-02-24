import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BankModule } from './core/bank/bank.module';
import { CategoryModule } from './core/category/category.module';
import { TransactionModule } from './core/transaction/transaction.module';
import { TypeOrmModule } from './database/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    BankModule,
    CategoryModule,
    TransactionModule,
  ],
})
export class AppModule {}
