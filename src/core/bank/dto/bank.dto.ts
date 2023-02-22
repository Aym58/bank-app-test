import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export interface GetBankDto {
  id: number;
  name: string;
  balanse: number;
}

export class UpdateBankDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
