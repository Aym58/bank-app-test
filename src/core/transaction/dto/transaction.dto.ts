import { ApiProperty } from '@nestjs/swagger/dist';

import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import {
  TransactionTypes,
  TransactionTypesType,
} from '../constant/transaction.types';
import { Messages } from '../enum/messages.enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 500, description: 'Transaction amount' })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionTypes, {
    message: Messages.INVALID_TYPE,
  })
  @ApiProperty({ example: 'profitable', description: 'Transaction type' })
  type: TransactionTypesType;

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'Bank id' })
  bankId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '[1,2]', description: 'Category id' })
  categoriesId: number[];
}

export class GetTransactionDto {
  @ApiProperty({ example: 1, description: 'Transaction id' })
  id: number;

  @ApiProperty({ example: 500, description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ example: 'profitable', description: 'Transaction type' })
  type: TransactionTypesType;
}
