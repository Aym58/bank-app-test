import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty } from 'class-validator';

export class GetStatisticsDto {
  @IsNotEmpty()
  @ApiProperty({ example: [1, 2, 3], description: 'Category ids' })
  categoryIds: number[];

  @IsNotEmpty()
  @ApiProperty({
    example: '2020/06/20',
    description: 'Start date in format YYYY-MM-DD',
  })
  fromPeriod: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '2020/06/20',
    description: 'End date in format YYYY-MM-DD',
  })
  toPeriod: string;
}

export interface IStatistics {
  [key: string]: number;
}
