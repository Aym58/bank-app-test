import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { BankEntity } from './bank.entity';
import { CreateBankDto, GetBankDto, UpdateBankDto } from './dto/bank.dto';
import { Messages } from './enum/messages.enum';

export const BankRepository = dataSource.getRepository(BankEntity).extend({
  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const { name } = createBankDto;
    const bank = new BankEntity();
    bank.name = name.toLowerCase();

    await bank.save();
    return bank;
  },

  async getAllBanks(): Promise<GetBankDto[]> {
    const banks = await this.createQueryBuilder('bank')
      .addOrderBy('bank.id', 'ASC')
      .select(['bank.id', 'bank.name', 'bank.balance'])
      .getMany();

    return banks;
  },

  async updateBank(
    bank: BankEntity,
    updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    const { name } = updateBankDto;
    bank.name = name.toLowerCase();

    await bank.save();
    return bank;
  },

  async updateBankBalance(bank: BankEntity): Promise<void> {
    const { balance } = await this.createQueryBuilder('bank')
      .leftJoinAndSelect('bank.transactions', 'transaction')
      .where('bank.id = :id', { id: bank.id })
      .select('bank.id')
      .groupBy('bank.id')
      .addSelect('SUM(transaction.amount)', 'balance')
      .getRawOne();

    bank.balance = Number(balance);
    await bank.save();
  },

  async deleteBank(bank: BankEntity): Promise<void> {
    const { transactions } = await this.createQueryBuilder('bank')
      .leftJoinAndSelect('bank.transactions', 'transaction')
      .where('bank.id = :id', { id: bank.id })
      .getOne();

    if (transactions && transactions.length !== 0) {
      throw new Error(Messages.HAVE_TRANSACTIONS);
    }

    await bank.remove();
  },
});
