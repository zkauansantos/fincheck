import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Subcategory } from '../../../../../domain/entities/subcategory.entity';
import { EntityNotFoundException } from '../../../../../domain/exceptions/entity-not-found.exception';
import { CategoryRepository } from '../../../../../domain/repositories/category.repository.interface';
import { SubcategoryRepository } from '../../../../../domain/repositories/subcategory.repository.interface';
import { InjectRepository } from '../../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../../usecase';
import { CreateSubcategoryUseCaseInput } from './input';
import { CreateSubcategoryUseCaseOutput } from './output';

@Injectable()
export class CreateSubcategoryUseCase
  implements
    UseCase<
      CreateSubcategoryUseCaseInput,
      Promise<CreateSubcategoryUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository('SUBCATEGORIES')
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async execute(
    input: CreateSubcategoryUseCaseInput,
  ): Promise<CreateSubcategoryUseCaseOutput> {
    const { categoryId, name } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw EntityNotFoundException.category(categoryId);
    }

    const subcategory = Subcategory.create({
      id: randomUUID(),
      categoryId,
      name,
    });

    await this.subcategoryRepository.save(subcategory);

    return {
      id: subcategory.getId(),
      categoryId: subcategory.getCategoryId(),
      name: subcategory.getName(),
    };
  }
}
