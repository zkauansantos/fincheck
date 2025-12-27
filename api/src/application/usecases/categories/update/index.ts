import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { UpdateCategoryUseCaseInput } from './input';
import { UpdateCategoryUseCaseOutput } from './output';

@Injectable()
export class UpdateCategoryUseCase
  implements
    UseCase<UpdateCategoryUseCaseInput, Promise<UpdateCategoryUseCaseOutput>>
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    input: UpdateCategoryUseCaseInput,
  ): Promise<UpdateCategoryUseCaseOutput> {
    const { categoryId, userId, name, icon } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw EntityNotFoundException.category(categoryId);
    }

    if (!category.belongsToUser(userId)) {
      throw InvalidOwnershipException.category(categoryId);
    }

    if (name) {
      category.updateName(name);
    }

    if (icon) {
      category.updateIcon(icon);
    }

    await this.categoryRepository.update(category);

    return {
      id: category.getId(),
      userId: category.getUserId(),
      name: category.getName(),
      icon: category.getIcon(),
      type: category.getType(),
    };
  }
}
