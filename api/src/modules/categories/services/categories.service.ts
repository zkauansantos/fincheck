import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { SubcategoriesRepository } from 'src/shared/database/repositories/subcategories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly subcategoriesRepository: SubcategoriesRepository,
  ) {}

  async findAllCategories(userId: string, type?: Transaction['type']) {
    return this.categoriesRepository.findMany({
      where: {
        OR: [{ userId }, { userId: null }],
        type,
      },
      include: {
        subcategories: {
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findCategoryById(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findFirst({
      where: {
        id: categoryId,
        OR: [{ userId }, { userId: null }],
      },
      include: {
        subcategories: {
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async createCategory(userId: string, createDto: CreateCategoryDto) {
    const { name, icon, type } = createDto;

    const existingCategory = await this.categoriesRepository.findFirst({
      where: { userId, name },
    });

    if (existingCategory) {
      throw new ConflictException(
        'A category with this name already exists for this user',
      );
    }

    return this.categoriesRepository.create({
      data: {
        userId,
        name,
        icon,
        type,
      },
    });
  }

  async updateCategory(
    userId: string,
    categoryId: string,
    updateDto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesRepository.findFirst({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new NotFoundException(
        'Category not found or you do not have permission to update it',
      );
    }

    if (updateDto.name) {
      const existingCategory = await this.categoriesRepository.findFirst({
        where: {
          userId,
          name: updateDto.name,
          id: { not: categoryId },
        },
      });

      if (existingCategory) {
        throw new ConflictException('A category with this name already exists');
      }
    }

    return this.categoriesRepository.update({
      where: { id: categoryId },
      data: updateDto,
    });
  }

  async deleteCategory(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findFirst({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new NotFoundException(
        'Category not found or you do not have permission to delete it',
      );
    }

    await this.categoriesRepository.delete({
      where: { id: categoryId },
    });
  }

  async findAllSubcategories(categoryId: string) {
    return this.subcategoriesRepository.findMany({
      where: { categoryId },
      orderBy: { name: 'asc' },
    });
  }
}
