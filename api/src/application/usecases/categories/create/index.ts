import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Category } from '../../../../domain/entities/category.entity';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { CreateCategoryUseCaseInput } from './input';
import { CreateCategoryUseCaseOutput } from './output';

@Injectable()
export class CreateCategoryUseCase
  implements
    UseCase<CreateCategoryUseCaseInput, Promise<CreateCategoryUseCaseOutput>>
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    input: CreateCategoryUseCaseInput,
  ): Promise<CreateCategoryUseCaseOutput> {
    const { userId, name, icon, type } = input;

    const category = Category.createCustom(
      randomUUID(),
      userId,
      name,
      icon,
      type,
    );

    await this.categoryRepository.save(category);

    return {
      id: category.getId(),
      userId: category.getUserId(),
      name: category.getName(),
      icon: category.getIcon(),
      type: category.getType(),
    };
  }
}
