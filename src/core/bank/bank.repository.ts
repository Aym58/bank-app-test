import { dataSource } from 'src/database/typeorm/typeorm.datasource';

import { BankEntity } from './bank.entity';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';

export const BankRepository = dataSource.getRepository(BankEntity).extend({
  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const { name } = createBankDto;
    const bank = new BankEntity();
    bank.name = name;
    await bank.save();
    return bank;
  },

  async getAllBanks(): Promise<GetBankDto[]> {
    const query = this.createQueryBuilder('bank');
    query.addOrderBy('bank.id', 'DESC');
    query.select(['bank.id', 'bank.name', 'bank.balance']);
    return query.getMany();
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
