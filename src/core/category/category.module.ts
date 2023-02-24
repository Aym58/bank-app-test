import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TransactionEntity } from '../transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, TransactionEntity])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
