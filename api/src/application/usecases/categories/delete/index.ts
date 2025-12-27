import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../domain/exceptions/entity-not-found.exception';
import { InvalidOwnershipException } from '../../../../domain/exceptions/invalid-ownership.exception';
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
      throw EntityNotFoundException.category(categoryId);
    }

    if (!category.belongsToUser(userId)) {
      throw InvalidOwnershipException.category(categoryId);
    }

    await this.categoryRepository.delete(categoryId);
  }
}
