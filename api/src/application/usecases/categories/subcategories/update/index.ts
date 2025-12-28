import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../../../exceptions/resource-not-found.exception';
import { SubcategoryRepository } from '../../../../../domain/repositories/subcategory.repository.interface';
import { InjectRepository } from '../../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../../usecase';
import { UpdateSubcategoryUseCaseInput } from './input';
import { UpdateSubcategoryUseCaseOutput } from './output';

@Injectable()
export class UpdateSubcategoryUseCase
  implements
    UseCase<
      UpdateSubcategoryUseCaseInput,
      Promise<UpdateSubcategoryUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('SUBCATEGORIES')
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async execute(
    input: UpdateSubcategoryUseCaseInput,
  ): Promise<UpdateSubcategoryUseCaseOutput> {
    const { subcategoryId, name } = input;

    const subcategory = await this.subcategoryRepository.findById(
      subcategoryId,
    );

    if (!subcategory) {
      throw ResourceNotFoundException.subcategory(subcategoryId);
    }

    subcategory.updateName(name);

    await this.subcategoryRepository.update(subcategory);

    return {
      id: subcategory.getId(),
      categoryId: subcategory.getCategoryId(),
      name: subcategory.getName(),
    };
  }
}
