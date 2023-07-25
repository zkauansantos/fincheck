import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnerService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async validate(categoryId: string, userId: string) {
    const isOwner = await this.categoriesRepository.findFirst({
      where: { id: categoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('CategoryId not found.');
    }
  }
}
