import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { GetCategoryByIdUseCaseInput } from './input';
import { GetCategoryByIdUseCaseOutput } from './output';

@Injectable()
export class GetCategoryByIdUseCase
  implements
    UseCase<GetCategoryByIdUseCaseInput, Promise<GetCategoryByIdUseCaseOutput>>
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    input: GetCategoryByIdUseCaseInput,
  ): Promise<GetCategoryByIdUseCaseOutput> {
    const { userId, categoryId } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw EntityNotFoundException.category(categoryId);
    }

    // Allow access if it's a default category (userId is null) or if it belongs to the user
    if (category.getUserId() !== null && !category.belongsToUser(userId)) {
      throw InvalidOwnershipException.category(category.getId());
    }

    return {
      id: category.getId(),
      userId: category.getUserId(),
      name: category.getName(),
      icon: category.getIcon(),
      type: category.getType(),
    };
  }
}
