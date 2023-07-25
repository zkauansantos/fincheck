import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnerService } from './services/validate-category-owner.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnerService],
  exports: [ValidateCategoryOwnerService],
})
export class CategoriesModule {}
