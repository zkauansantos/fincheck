export interface SubcategoryDto {
  id: string;
  categoryId: string;
  name: string;
}

export type ListSubcategoriesUseCaseOutput = SubcategoryDto[];
