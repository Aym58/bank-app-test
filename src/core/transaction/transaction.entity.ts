import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BankEntity } from '../bank/bank.entity';
import { TransactionTypesType } from './constant/transaction.types';

@Entity({ name: 'transaction' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: TransactionTypesType;

  @ManyToOne(() => BankEntity, (bank) => bank.transactions)
  @JoinColumn()
  bank: BankEntity;
}
