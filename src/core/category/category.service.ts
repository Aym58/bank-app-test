import { Injectable } from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';
import {
  CreateCategoryDto,
  GetCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    const category = await CategoryRepository.createCategory(createCategoryDto);
    return { id: category.id, name: category.name };
  }

  async getAllCategories(): Promise<GetCategoryDto[]> {
    const response = await CategoryRepository.getAllCategories();
    return response;
  }

  async getOneCategory(category: CategoryEntity): Promise<GetCategoryDto> {
    return { id: category.id, name: category.name };
  }

  async updateCategory(
    category: CategoryEntity,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    const categoryUpdated = await CategoryRepository.updateCategory(
      category,
      updateCategoryDto,
    );
    return {
      id: categoryUpdated.id,
      name: categoryUpdated.name,
    };
  }

  async deleteCategory(Category: CategoryEntity): Promise<void> {
    await Category.remove();
  }
}
