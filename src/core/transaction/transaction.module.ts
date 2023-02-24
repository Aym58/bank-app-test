import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionEntity } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { BankService } from '../bank/bank.service';
import { CategoryEntity } from '../category/category.entity';
import { BankEntity } from '../bank/bank.entity';
import { HttpModule } from '@nestjs/axios/dist';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([TransactionEntity, CategoryEntity, BankEntity]),
  ],
  providers: [TransactionService, CategoryService, BankService],
  controllers: [TransactionController],
})
export class TransactionModule {}
