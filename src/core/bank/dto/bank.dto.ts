import { ApiProperty } from '@nestjs/swagger/dist';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Chase', description: 'Bank name' })
  name: string;
}

export class GetBankDto {
  @ApiProperty({ example: 1, description: 'Bank id' })
  id: number;
  @ApiProperty({ example: 'Chase', description: 'Bank name' })
  name: string;
  @ApiProperty({ example: 1200, description: 'Bank balance' })
  balance: number;
}

export class UpdateBankDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Chase', description: 'Bank name' })
  name: string;
}
