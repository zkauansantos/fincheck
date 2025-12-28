import { Injectable } from '@nestjs/common';
import { Subcategory } from '../../../domain/entities/subcategory.entity';
import { SubcategoryRepository } from '../../../domain/repositories/subcategory.repository.interface';

import { SubcategoryPrismaMapper } from '../prisma/mappers/subcategory.prisma-mapper';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaSubcategoryRepository implements SubcategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Subcategory | null> {
    const prismaSubcategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });

    if (!prismaSubcategory) {
      return null;
    }

    return SubcategoryPrismaMapper.toDomain(prismaSubcategory);
  }

  async findAllByCategoryId(categoryId: string): Promise<Subcategory[]> {
    const prismaSubcategories = await this.prisma.subCategory.findMany({
      where: { categoryId },
      orderBy: { name: 'asc' },
    });

    return prismaSubcategories.map(SubcategoryPrismaMapper.toDomain);
  }

  async save(subcategory: Subcategory): Promise<Subcategory> {
    const data = SubcategoryPrismaMapper.toPrismaCreate(subcategory);

    const prismaSubcategory = await this.prisma.subCategory.create({
      data,
    });

    return SubcategoryPrismaMapper.toDomain(prismaSubcategory);
  }

  async update(subcategory: Subcategory): Promise<Subcategory> {
    const data = SubcategoryPrismaMapper.toPrismaUpdate(subcategory);

    const prismaSubcategory = await this.prisma.subCategory.update({
      where: { id: subcategory.getId() },
      data,
    });

    return SubcategoryPrismaMapper.toDomain(prismaSubcategory);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subCategory.delete({
      where: { id },
    });
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.prisma.subCategory.count({
      where: { id },
    });

    return count > 0;
  }

  async countByCategoryId(categoryId: string): Promise<number> {
    return this.prisma.subCategory.count({
      where: { categoryId },
    });
  }
}
