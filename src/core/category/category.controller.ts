import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/exception.filter';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { GetCategory } from './decorator/category.decorator';
import {
  CreateCategoryDto,
  GetCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@ApiTags('Category')
@Controller('category')
@UseFilters(HttpExceptionFilter)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Category created',
  })
  @ApiConflictResponse({ description: 'Category already exists' })
  async createCategory(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<GetCategoryDto> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all Categories', type: [GetCategoryDto] })
  async getAllCategorys(): Promise<GetCategoryDto[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get one category', type: GetCategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async getOneCategory(
    @GetCategory() category: CategoryEntity,
  ): Promise<GetCategoryDto> {
    return this.categoryService.getOneCategory(category);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Category updated', type: GetCategoryDto })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async updateCategory(
    @GetCategory() category: CategoryEntity,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ): Promise<GetCategoryDto> {
    return this.categoryService.updateCategory(category, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Category deleted' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  async deleteCategory(@GetCategory() category: CategoryEntity): Promise<void> {
    return this.categoryService.deleteCategory(category);
  }
}
