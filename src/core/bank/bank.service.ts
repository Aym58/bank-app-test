import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

import { BankEntity } from './bank.entity';
import { BankRepository } from './bank.repository';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';
import { Messages } from './enum/messages.enum';

@Injectable()
export class BankService {
  async createBank(createBankDto: CreateBankDto): Promise<GetBankDto> {
    const { name } = createBankDto;
    const alreadyExists = await BankRepository.findOne({
      where: { name: name.toLowerCase() },
    });

    if (alreadyExists) {
      throw new ConflictException(Messages.ALRESDY_EXISTS);
    }

    try {
      const bank = await BankRepository.createBank(createBankDto);
      return { id: bank.id, name: bank.name, balance: bank.balance };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllBanks(): Promise<GetBankDto[]> {
    try {
      const bankList = await BankRepository.getAllBanks();
      return bankList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
    const name = updateBankDto.name.toLowerCase();
    if (name && name !== bank.name) {
      const alreadyExists = await BankRepository.findOne({
        where: { name },
      });
      if (alreadyExists) {
        throw new ConflictException(Messages.ALRESDY_EXISTS);
      }
      try {
        const bankUpdated = await BankRepository.updateBank(
          bank,
          updateBankDto,
        );
        return {
          id: bankUpdated.id,
          name: bankUpdated.name,
          balance: bankUpdated.balance,
        };
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async updateBankBalance(bank: BankEntity): Promise<void> {
    await BankRepository.updateBankBalance(bank);
  }

  async deleteBank(bank: BankEntity): Promise<void> {
    try {
      await BankRepository.deleteBank(bank);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
