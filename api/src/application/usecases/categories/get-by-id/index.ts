import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
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
      throw ResourceNotFoundException.category(categoryId);
    }

    // Allow access if it's a default category (userId is null) or if it belongs to the user
    if (category.getUserId() !== null && !category.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership("categoria");
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
