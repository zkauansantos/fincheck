import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { ListCategoriesUseCaseInput } from './input';
import { ListCategoriesUseCaseOutput } from './output';

@Injectable()
export class ListCategoriesUseCase
  implements
    UseCase<ListCategoriesUseCaseInput, Promise<ListCategoriesUseCaseOutput>>
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    input: ListCategoriesUseCaseInput,
  ): Promise<ListCategoriesUseCaseOutput> {
    const { userId, type } = input;

    const findAll = type
      ? this.categoryRepository.findAllAccessibleByUserAndType
      : this.categoryRepository.findAllAccessibleByUser;

    const categories = await findAll(userId, type);

    return categories.map((category) => ({
      id: category.getId(),
      userId: category.getUserId(),
      name: category.getName(),
      icon: category.getIcon(),
      type: category.getType(),
    }));
  }
}
