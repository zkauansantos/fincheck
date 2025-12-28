import { Category as PrismaCategory } from '@prisma/client';
import { Category } from '../../../../domain/entities/category.entity';
import { TransactionType } from '../../../../domain/enums/transaction-type.enum';

export class CategoryPrismaMapper {
  static toDomain(prismaCategory: PrismaCategory): Category {
    return Category.reconstitute({
      id: prismaCategory.id,
      userId: prismaCategory.userId,
      name: prismaCategory.name,
      icon: prismaCategory.icon,
      type: prismaCategory.type as TransactionType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static toPrismaCreate(category: Category) {
    return {
      id: category.getId(),
      userId: category.getUserId(),
      name: category.getName(),
      icon: category.getIcon(),
      type: category.getType(),
    };
  }

  static toPrismaUpdate(category: Category) {
    return {
      name: category.getName(),
      icon: category.getIcon(),
    };
  }
}
