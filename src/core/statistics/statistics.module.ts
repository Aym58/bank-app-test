import { Module } from '@nestjs/common';

import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

import { TransactionService } from '../transaction/transaction.service';
import { BankService } from '../bank/bank.service';
import { CategoryService } from '../category/category.service';

@Module({
  providers: [
    StatisticsService,
    TransactionService,
    BankService,
    CategoryService,
  ],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
