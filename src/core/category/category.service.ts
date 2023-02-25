import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import {
  CreateCategoryDto,
  GetCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';
import { Messages } from './enum/messages.enum';

@Injectable()
export class CategoryService {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    const { name } = createCategoryDto;
    const alreadyExists = await CategoryRepository.findOne({
      where: { name: name.toLowerCase() },
    });
    if (alreadyExists) {
      throw new ConflictException(Messages.ALRESDY_EXISTS);
    }
    try {
      const category = await CategoryRepository.createCategory(
        createCategoryDto,
      );
      return { id: category.id, name: category.name };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllCategories(): Promise<GetCategoryDto[]> {
    try {
      const categoryList = await CategoryRepository.getAllCategories();
      return categoryList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getOneCategory(category: CategoryEntity): Promise<GetCategoryDto> {
    return { id: category.id, name: category.name };
  }

  async getCategoriesByIdArray(
    categoryArray: number[],
  ): Promise<CategoryEntity[]> {
    const categories = await CategoryRepository.getCategoriesByIdArray(
      categoryArray,
    );
    if (!categories || categories.length !== categoryArray.length) {
      throw new NotFoundException(Messages.NOT_FOUND);
    }
    return categories;
  }

  async updateCategory(
    category: CategoryEntity,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    const name = updateCategoryDto.name.toLowerCase();
    if (name && name !== category.name) {
      const alreadyExists = await CategoryRepository.findOne({
        where: { name },
      });
      if (alreadyExists) {
        throw new ConflictException(Messages.ALRESDY_EXISTS);
      }
      const categoryUpdated = await CategoryRepository.updateCategory(
        category,
        updateCategoryDto,
      );
      return {
        id: categoryUpdated.id,
        name: categoryUpdated.name,
      };
    }
  }

  async deleteCategory(category: CategoryEntity): Promise<void> {
    try {
      await CategoryRepository.deleteCategory(category);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
