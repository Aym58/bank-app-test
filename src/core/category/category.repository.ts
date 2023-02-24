import { ConflictException } from '@nestjs/common';

import { dataSource } from 'src/database/typeorm/typeorm.datasource';
import { CategoryEntity } from './category.entity';
import {
  CreateCategoryDto,
  GetCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import { Messages } from './enum/messages.enum';

export const CategoryRepository = dataSource
  .getRepository(CategoryEntity)
  .extend({
    async createCategory(
      createCategoryDto: CreateCategoryDto,
    ): Promise<CategoryEntity> {
      const { name } = createCategoryDto;

      const alreadyExists = await this.findOne({
        where: { name: name.toLowerCase() },
      });

      if (alreadyExists) {
        throw new ConflictException(Messages.ALRESDY_EXISTS);
      }
      const category = new CategoryEntity();
      category.name = name.toLowerCase();
      await category.save();
      return category;
    },

    async getAllCategories(): Promise<GetCategoryDto[]> {
      const query = this.createQueryBuilder('category')
        .addOrderBy('category.id', 'DESC')
        .select(['category.id', 'category.name'])
        .getMany();
      return query;
    },

    async getCategoriesByIdArray(array: number[]): Promise<CategoryEntity[]> {
      const query = this.createQueryBuilder('category')
        .addOrderBy('category.id', 'DESC')
        .where('category.id IN (:...ids)', {
          ids: array,
        })
        .select(['category.id', 'category.name'])
        .getMany();

      return query;
    },

    async updateCategory(
      category: CategoryEntity,
      updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
      const { name } = updateCategoryDto;
      if (name && name !== category.name) {
        category.name = name;
      }
      await category.save();
      return category;
    },
  });
