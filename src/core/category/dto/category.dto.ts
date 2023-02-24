import { ApiProperty } from '@nestjs/swagger/dist';

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'food', description: 'Category name' })
  name: string;
}

export class GetCategoryDto {
  @ApiProperty({ example: 1, description: 'Category id' })
  id: number;
  @ApiProperty({ example: 'food', description: 'Category name' })
  name: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'food', description: 'Category name' })
  name: string;
}
