import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToMany(() => TransactionEntity, (transaction) => transaction.categories)
  transactions: TransactionEntity[];
}
