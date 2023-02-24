import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  ValidationPipe,
  UseFilters,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

import { HttpExceptionFilter } from '../common/exception.filter';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { GetTransaction } from './decorator/transaction.decorator';
import { CreateTransactionDto, GetTransactionDto } from './dto/transaction.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Transaction')
@Controller('transaction')
@UseFilters(HttpExceptionFilter)
export class TransactionController {
  constructor(
    private transactionService: TransactionService,
    private readonly httpService: HttpService,
  ) {}

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
    description: 'Get all Transactions',
    type: [GetTransactionDto],
  })
  async getAllTransactions(
    @Query() { page = 1, limit = 10 }: PaginationDto,
  ): Promise<GetTransactionDto[]> {
    return this.transactionService.getAllTransactions({ page, limit });
  }

  @Delete([':id'])
  @ApiOkResponse({ description: 'Transaction deleted' })
  @ApiNotFoundResponse({ description: 'Transaction not found' })
  async deleteTransaction(
    @GetTransaction() Transaction: TransactionEntity,
  ): Promise<void> {
    return this.transactionService.deleteTransaction(Transaction);
  }
}
