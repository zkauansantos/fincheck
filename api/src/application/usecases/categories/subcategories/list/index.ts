import { Injectable } from '@nestjs/common';
import { SubcategoryRepository } from '../../../../../domain/repositories/subcategory.repository.interface';
import { InjectRepository } from '../../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../../usecase';
import { ListSubcategoriesUseCaseInput } from './input';
import { ListSubcategoriesUseCaseOutput } from './output';

@Injectable()
export class ListSubcategoriesUseCase
  implements
    UseCase<
      ListSubcategoriesUseCaseInput,
      Promise<ListSubcategoriesUseCaseOutput>
    >
{
  constructor(
    @InjectRepository('SUBCATEGORIES')
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async execute(
    input: ListSubcategoriesUseCaseInput,
  ): Promise<ListSubcategoriesUseCaseOutput> {
    const { categoryId } = input;

    const subcategories = await this.subcategoryRepository.findAllByCategoryId(
      categoryId,
    );

    return subcategories.map((subcategory) => ({
      id: subcategory.getId(),
      categoryId: subcategory.getCategoryId(),
      name: subcategory.getName(),
    }));
  }
}
