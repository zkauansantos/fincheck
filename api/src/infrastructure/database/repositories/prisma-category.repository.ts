import { Injectable } from '@nestjs/common';
import { Category } from '../../../domain/entities/category.entity';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { CategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CategoryPrismaMapper } from '../prisma/mappers/category.prisma-mapper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Category | null> {
    const prismaCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!prismaCategory) {
      return null;
    }

    return CategoryPrismaMapper.toDomain(prismaCategory);
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Category | null> {
    const prismaCategory = await this.prisma.category.findFirst({
      where: { id, userId },
    });

    if (!prismaCategory) {
      return null;
    }

    return CategoryPrismaMapper.toDomain(prismaCategory);
  }

  async findAllByUserId(userId: string): Promise<Category[]> {
    const prismaCategories = await this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    return prismaCategories.map(CategoryPrismaMapper.toDomain);
  }

  async findAllAccessibleByUser(userId: string): Promise<Category[]> {
    const prismaCategories = await this.prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId }],
      },
      orderBy: { name: 'asc' },
    });

    return prismaCategories.map(CategoryPrismaMapper.toDomain);
  }

  async findAllAccessibleByUserAndType(
    userId: string,
    type: TransactionType,
  ): Promise<Category[]> {
    const prismaCategories = await this.prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId }],
        type,
      },
      orderBy: { name: 'asc' },
    });

    return prismaCategories.map(CategoryPrismaMapper.toDomain);
  }

  async save(category: Category): Promise<Category> {
    const data = CategoryPrismaMapper.toPrismaCreate(category);

    const prismaCategory = await this.prisma.category.create({
      data,
    });

    return CategoryPrismaMapper.toDomain(prismaCategory);
  }

  async update(category: Category): Promise<Category> {
    const data = CategoryPrismaMapper.toPrismaUpdate(category);

    const prismaCategory = await this.prisma.category.update({
      where: { id: category.getId() },
      data,
    });

    return CategoryPrismaMapper.toDomain(prismaCategory);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: { id },
    });

    return count > 0;
  }
}
