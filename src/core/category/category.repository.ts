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
      const category = new CategoryEntity();
      category.name = name.toLowerCase();
      await category.save();
      return category;
    },

    async getAllCategories(): Promise<GetCategoryDto[]> {
      const categories = await this.createQueryBuilder('category')
        .addOrderBy('category.id', 'ASC')
        .select(['category.id', 'category.name'])
        .getMany();
      return categories;
    },

    async getCategoriesByIdArray(array: number[]): Promise<CategoryEntity[]> {
      const categories = await this.createQueryBuilder('category')
        .addOrderBy('category.id', 'ASC')
        .leftJoin('category.transactions', 'transaction')
        .where('category.id IN (:...ids)', {
          ids: array,
        })
        .select(['category.id', 'category.name', 'transaction'])
        .getMany();
      return categories;
    },

    async updateCategory(
      category: CategoryEntity,
      updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
      const { name } = updateCategoryDto;
      category.name = name.toLowerCase();
      await category.save();
      return category;
    },

    async deleteCategory(category: CategoryEntity): Promise<void> {
      const { transactions } = await this.createQueryBuilder('category')
        .leftJoinAndSelect('category.transactions', 'transaction')
        .where('category.id = :id', { id: category.id })
        .getOne();
      if (transactions && transactions.length !== 0) {
        throw new Error(Messages.HAVE_TRANSACTIONS);
      }
      await category.remove();
    },
  });
