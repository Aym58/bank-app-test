import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({ name: 'bank' })
export class BankEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.bank)
  transactions: TransactionEntity[];
}
