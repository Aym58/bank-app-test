import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
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
import { BankEntity } from './bank.entity';
import { BankService } from './bank.service';
import { GetBank } from './decorator/bank.decorator';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';

@ApiTags('Bank')
@Controller('bank')
@UseFilters(HttpExceptionFilter)
export class BankController {
  constructor(private bankService: BankService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Bank created',
  })
  @ApiConflictResponse({ description: 'Bank already exists' })
  async createBank(
    @Body(ValidationPipe) createBankDto: CreateBankDto,
  ): Promise<GetBankDto> {
    return await this.bankService.createBank(createBankDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all banks', type: [GetBankDto] })
  async getAllBanks(): Promise<GetBankDto[]> {
    return this.bankService.getAllBanks();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get one bank', type: GetBankDto })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  async getOneBank(@GetBank() bank: BankEntity): Promise<GetBankDto> {
    return this.bankService.getOneBank(bank);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Bank updated', type: GetBankDto })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  async updateBank(
    @GetBank() bank: BankEntity,
    @Body(ValidationPipe) updateBankDto: UpdateBankDto,
  ): Promise<GetBankDto> {
    return this.bankService.updateBank(bank, updateBankDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Bank deleted' })
  @ApiNotFoundResponse({ description: 'Bank not found' })
  async deleteBank(@GetBank() bank: BankEntity): Promise<void> {
    return this.bankService.deleteBank(bank);
  }
}
