import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
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
      throw ResourceNotFoundException.category(categoryId);
    }

    if (!category.isAccessibleByUser(userId)) {
      throw ForbiddenException.invalidOwnership('categoria');
    }

    category.updateName(name);
    category.updateIcon(icon);

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
