import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseFilters,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';
import { StatisticsService } from './statistics.service';
import { GetStatisticsDto, IStatistics } from './dto/statistics.dto';

@ApiTags('Statistics')
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
  @ApiNotFoundResponse({ description: 'Category not found' })
  async createCategory(
    @Body(ValidationPipe) getStatisticsDto: GetStatisticsDto,
  ): Promise<IStatistics | any> {
    return await this.statisticsService.getStatistics(getStatisticsDto);
  }
}
