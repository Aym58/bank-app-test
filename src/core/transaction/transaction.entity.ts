import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BankEntity } from '../bank/bank.entity';
import { CategoryEntity } from '../category/category.entity';
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

  @ManyToMany(() => CategoryEntity, (category) => category.transactions)
  @JoinTable()
  categories: CategoryEntity[];
}
