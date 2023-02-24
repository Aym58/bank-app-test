import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankEntity } from './bank.entity';

import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TransactionEntity } from '../transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity, TransactionEntity])],
  providers: [BankService],
  controllers: [BankController],
})
export class BankModule {}
