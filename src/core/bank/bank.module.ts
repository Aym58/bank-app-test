import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankEntity } from './bank.entity';

import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  providers: [BankService],
  controllers: [BankController],
})
export class BankModule {}
