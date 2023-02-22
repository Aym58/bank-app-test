import { Injectable } from '@nestjs/common';

import { BankEntity } from './bank.entity';
import { BankRepository } from './bank.repository';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';

@Injectable()
export class BankService {
  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const response = await BankRepository.createBank(createBankDto);
    return response;
  }

  async getAllBanks(): Promise<GetBankDto[]> {
    const response = await BankRepository.getAllBanks();
    return response;
  }

  async getOneBank(bank: BankEntity): Promise<BankEntity> {
    return bank;
  }

  async updateBank(
    bank: BankEntity,
    updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    const response = await BankRepository.updateBank(bank, updateBankDto);
    return response;
  }

  async deleteBank(bank: BankEntity): Promise<void> {
    await bank.remove();
  }
}
