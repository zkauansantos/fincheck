import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../../application/usecases/categories/create';
import { DeleteCategoryUseCase } from '../../../application/usecases/categories/delete';
import { GetCategoryByIdUseCase } from '../../../application/usecases/categories/get-by-id';
import { ListCategoriesUseCase } from '../../../application/usecases/categories/list';
import { CreateSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/create';
import { DeleteSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/delete';
import { ListSubcategoriesUseCase } from '../../../application/usecases/categories/subcategories/list';
import { UpdateSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/update';
import { UpdateCategoryUseCase } from '../../../application/usecases/categories/update';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    ListCategoriesUseCase,
    GetCategoryByIdUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    ListSubcategoriesUseCase,
    CreateSubcategoryUseCase,
    UpdateSubcategoryUseCase,
    DeleteSubcategoryUseCase,
  ],
})
export class CategoriesModule {}
