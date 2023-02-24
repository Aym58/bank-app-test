import { ConflictException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { BankEntity } from './bank.entity';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';
import { Messages } from './enum/messages.enum';

export const BankRepository = dataSource.getRepository(BankEntity).extend({
  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const { name } = createBankDto;

    const alreadyExists = await this.findOne({
      where: { name: name.toLowerCase() },
    });

    if (alreadyExists) {
      throw new ConflictException(Messages.ALRESDY_EXISTS);
    }
    const bank = new BankEntity();
    bank.name = name.toLowerCase();
    await bank.save();
    return bank;
  },

  async getAllBanks(): Promise<GetBankDto[]> {
    const query = this.createQueryBuilder('bank')
      .addOrderBy('bank.id', 'DESC')
      .select(['bank.id', 'bank.name', 'bank.balance'])
      .getMany();
    return query;
  },

  async updateBank(
    bank: BankEntity,
    updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    const { name } = updateBankDto;
    if (name && name !== bank.name) {
      bank.name = name;
    }
    await bank.save();
    return bank;
  },
});
