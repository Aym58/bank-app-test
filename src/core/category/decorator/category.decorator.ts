import { createParamDecorator } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { CategoryEntity } from '../category.entity';
import { CategoryRepository } from '../category.repository';
import { Messages } from '../enum/messages.enum';

export const GetCategory = createParamDecorator(
  async (data: string, context): Promise<CategoryEntity> => {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const id = Number(params.id);

    const category = await CategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }

    return category;
  },
);
