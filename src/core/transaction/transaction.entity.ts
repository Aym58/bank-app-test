import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.transactions)
  @JoinTable()
  categories: CategoryEntity[];
}
