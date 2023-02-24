import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { GetTransaction } from './decorator/transaction.decorator';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';

@ApiTags('Transaction')
@Controller('Transaction')
@UseFilters(HttpExceptionFilter)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Transaction created',
  })
  @ApiConflictResponse({ description: 'Transaction already exists' })
  async createTransaction(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
  ): Promise<GetTransactionDto> {
    return await this.transactionService.createTransaction(
      createTransactionDto,
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all Categories',
    type: [GetTransactionDto],
  })
  async getAllTransactions(): Promise<GetTransactionDto[]> {
    return this.transactionService.getAllTransactions();
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Transaction deleted' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  async deleteTransaction(
    @GetTransaction() Transaction: TransactionEntity,
  ): Promise<void> {
    return this.transactionService.deleteTransaction(Transaction);
  }
}
