import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { ActiveUserId } from 'src/shared/decorators/activeUserId.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './services/categories.service';

@ApiTags('Categories')
@ApiBearerAuth('swagger-auth')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Categories endpoints
  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('type') type?: TransactionType,
  ) {
    return this.categoriesService.findAllCategories(userId, type);
  }

  @Get(':categoryId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoriesService.findCategoryById(userId, categoryId);
  }

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.createCategory(userId, createCategoryDto);
  }

  @Put(':categoryId')
  update(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(
      userId,
      categoryId,
      updateCategoryDto,
    );
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoriesService.deleteCategory(userId, categoryId);
  }

  @Get(':categoryId/subcategories')
  findAllSubcategories(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findAllSubcategories(categoryId);
  }
}
