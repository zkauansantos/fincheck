import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../../../../domain/exceptions/entity-not-found.exception';
import { SubcategoryRepository } from '../../../../../domain/repositories/subcategory.repository.interface';
import { InjectRepository } from '../../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../../usecase';
import { DeleteSubcategoryUseCaseInput } from './input';
import { DeleteSubcategoryUseCaseOutput } from './output';

@Injectable()
export class DeleteSubcategoryUseCase
  implements
    UseCase<
      DeleteSubcategoryUseCaseInput,
      Promise<DeleteSubcategoryUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('SUBCATEGORIES')
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async execute(
    input: DeleteSubcategoryUseCaseInput,
  ): Promise<DeleteSubcategoryUseCaseOutput> {
    const { subcategoryId } = input;

    const subcategory = await this.subcategoryRepository.findById(
      subcategoryId,
    );

    if (!subcategory) {
      throw EntityNotFoundException.subcategory(subcategoryId);
    }

    await this.subcategoryRepository.delete(subcategoryId);
  }
}
