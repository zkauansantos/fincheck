import { SubCategory as PrismaSubcategory } from '@prisma/client';
import { Subcategory } from '../../../../domain/entities/subcategory.entity';

export class SubcategoryPrismaMapper {
  static toDomain(prismaSubcategory: PrismaSubcategory): Subcategory {
    return Subcategory.reconstitute({
      id: prismaSubcategory.id,
      categoryId: prismaSubcategory.categoryId,
      name: prismaSubcategory.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toPrisma(subcategory: Subcategory): PrismaSubcategory {
    return {
      id: subcategory.getId(),
      categoryId: subcategory.getCategoryId(),
      name: subcategory.getName(),
    };
  }

  static toPrismaCreate(subcategory: Subcategory) {
    return {
      id: subcategory.getId(),
      categoryId: subcategory.getCategoryId(),
      name: subcategory.getName(),
    };
  }

  static toPrismaUpdate(subcategory: Subcategory) {
    return {
      name: subcategory.getName(),
    };
  }
}
