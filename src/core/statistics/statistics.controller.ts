import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiConflictResponse } from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';

import { StatisticsService } from './statistics.service';

import { StatisticsRequestDto, IStatistics } from './dto/statistics.dto';

@ApiTags('Category')
@Controller('statistics')
@UseFilters(HttpExceptionFilter)
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Post()
  @HttpCode(200)
  @ApiOkResponse({
    description:
      'Get statistics by period, example: { food: -800, salary: +2000 }',
  })
  @ApiConflictResponse({ description: 'Category already exists' })
  async createCategory(
    @Body(ValidationPipe) statisticsRequestDto: StatisticsRequestDto,
  ): Promise<IStatistics | any> {
    return await this.statisticsService.getStatistics(statisticsRequestDto);
  }
}
