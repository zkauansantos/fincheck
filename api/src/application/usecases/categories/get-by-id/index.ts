import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
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

    const category = await this.categoryRepository.findByIdAndUserId(
      categoryId,
      userId,
    );

    if (!category) {
      throw ResourceNotFoundException.category(categoryId);
    }

    if (category.hasUser() && !category.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership('categoria');
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
