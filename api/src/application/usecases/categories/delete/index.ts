import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { ForbiddenException } from '../../../exceptions/forbidden.exception';
import { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { DeleteCategoryUseCaseInput } from './input';
import { DeleteCategoryUseCaseOutput } from './output';

@Injectable()
export class DeleteCategoryUseCase
  implements
    UseCase<DeleteCategoryUseCaseInput, Promise<DeleteCategoryUseCaseOutput>>
{
  constructor(
    @InjectRepository('CATEGORIES')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(
    input: DeleteCategoryUseCaseInput,
  ): Promise<DeleteCategoryUseCaseOutput> {
    const { categoryId, userId } = input;

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw ResourceNotFoundException.category(categoryId);
    }

    if (!category.belongsToUser(userId)) {
      throw ForbiddenException.invalidOwnership("categoria");
    }

    await this.categoryRepository.delete(categoryId);
  }
}
