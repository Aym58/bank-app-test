import { Injectable, ConflictException } from '@nestjs/common';
import { getUnixTime, isMatch, parse } from 'date-fns';

import { CategoryService } from '../category/category.service';
import { IStatistics, GetStatisticsDto } from './dto/statistics.dto';
import { Messages } from './enum/messages.enum';

@Injectable()
export class StatisticsService {
  constructor(private readonly categoryService: CategoryService) {}

  async getStatistics(
    getStatisticsDto: GetStatisticsDto,
  ): Promise<IStatistics | any> {
    const { categoryIds, fromPeriod, toPeriod } = getStatisticsDto;

    if (
      !isMatch(fromPeriod, 'yyyyy-MM-dd') ||
      !isMatch(toPeriod, 'yyyyy-MM-dd')
    ) {
      throw new ConflictException(Messages.INVALID_DATE);
    }

    const from = getUnixTime(parse(fromPeriod, 'yyyyy-MM-dd', new Date()));
    const to = getUnixTime(parse(toPeriod, 'yyyyy-MM-dd', new Date()));

    const statistics = {};
    const categories = await this.categoryService.getCategoriesByIdArray(
      categoryIds,
    );

    categories.forEach(
      (category) =>
        (statistics[category.name] = category.transactions.reduce(
          (accum, transaction) =>
            getUnixTime(transaction.createdAt) >= from &&
            getUnixTime(transaction.createdAt) <= to
              ? accum + transaction.amount
              : accum,
          0,
        )),
    );
    return statistics;
  }
}
