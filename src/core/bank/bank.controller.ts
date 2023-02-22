import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { BankEntity } from './bank.entity';

import { BankService } from './bank.service';
import { GetBank } from './decorator/bank.decorator';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';

@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}

  @Post()
  async createBank(
    @Body(ValidationPipe) createBankDto: CreateBankDto,
  ): Promise<BankEntity> {
    return await this.bankService.createBank(createBankDto);
  }

  @Get()
  async getAllBanks(): Promise<GetBankDto[]> {
    return this.bankService.getAllBanks();
  }

  @Get(':id')
  async getOneBank(@GetBank() bank: BankEntity): Promise<BankEntity> {
    return this.bankService.getOneBank(bank);
  }

  @Patch(':id')
  async updateBank(
    @GetBank() bank: BankEntity,
    @Body(ValidationPipe) updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    return this.bankService.updateBank(bank, updateBankDto);
  }

  @Delete(':id')
  async deleteBank(@GetBank() bank: BankEntity): Promise<void> {
    return this.bankService.deleteBank(bank);
  }
}
