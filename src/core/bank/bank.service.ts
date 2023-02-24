import { Injectable, NotFoundException } from '@nestjs/common';

import { BankEntity } from './bank.entity';
import { BankRepository } from './bank.repository';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';
import { Messages } from './enum/messages.enum';

@Injectable()
export class BankService {
  async createBank(createBankDto: CreateBankDto): Promise<GetBankDto> {
    const bank = await BankRepository.createBank(createBankDto);
    return { id: bank.id, name: bank.name, balance: bank.balance };
  }

  async getAllBanks(): Promise<GetBankDto[]> {
    const response = await BankRepository.getAllBanks();
    return response;
  }

  async getOneBank(bank: BankEntity): Promise<GetBankDto> {
    return { id: bank.id, name: bank.name, balance: bank.balance };
  }

  async getBankById(id: number): Promise<BankEntity> {
    const bank = await BankRepository.findOne({
      where: { id },
    });

    if (!bank) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return bank;
  }

  async updateBank(
    bank: BankEntity,
    updateBankDto: UpdateBankDto,
  ): Promise<GetBankDto> {
    const bankUpdated = await BankRepository.updateBank(bank, updateBankDto);
    return {
      id: bankUpdated.id,
      name: bankUpdated.name,
      balance: bankUpdated.balance,
    };
  }

  async deleteBank(bank: BankEntity): Promise<void> {
    await bank.remove();
  }
}
