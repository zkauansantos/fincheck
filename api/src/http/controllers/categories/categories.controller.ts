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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../../application/usecases/categories/create';
import { DeleteCategoryUseCase } from '../../../application/usecases/categories/delete';
import { GetCategoryByIdUseCase } from '../../../application/usecases/categories/get-by-id';
import { ListCategoriesUseCase } from '../../../application/usecases/categories/list';
import { CreateSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/create';
import { DeleteSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/delete';
import { ListSubcategoriesUseCase } from '../../../application/usecases/categories/subcategories/list';
import { UpdateSubcategoryUseCase } from '../../../application/usecases/categories/subcategories/update';
import { UpdateCategoryUseCase } from '../../../application/usecases/categories/update';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { ActiveUserId } from '../../../shared/decorators/activeUserId.decorator';
import { CreateCategoryDto } from '../../dto/categories/create-category.dto';
import { CreateSubcategoryDto } from '../../dto/categories/create-subcategory.dto';
import { UpdateCategoryDto } from '../../dto/categories/update-category.dto';
import { UpdateSubcategoryDto } from '../../dto/categories/update-subcategory.dto';

@ApiTags('Categories')
@ApiBearerAuth('swagger-auth')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly listSubcategoriesUseCase: ListSubcategoriesUseCase,
    private readonly createSubcategoryUseCase: CreateSubcategoryUseCase,
    private readonly updateSubcategoryUseCase: UpdateSubcategoryUseCase,
    private readonly deleteSubcategoryUseCase: DeleteSubcategoryUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List all categories accessible by the authenticated user',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: TransactionType,
    description: 'Filter categories by transaction type',
  })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid', nullable: true },
          name: { type: 'string' },
          icon: { type: 'string' },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @ActiveUserId() userId: string,
    @Query('type') type?: TransactionType,
  ) {
    return this.listCategoriesUseCase.execute({ userId, type });
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid', nullable: true },
        name: { type: 'string' },
        icon: { type: 'string' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Category does not belong to user',
  })
  async getById(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.getCategoryByIdUseCase.execute({
      userId,
      categoryId,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new custom category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        icon: { type: 'string' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.createCategoryUseCase.execute({
      userId,
      name: createCategoryDto.name,
      icon: createCategoryDto.icon,
      type: createCategoryDto.type,
    });
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Update a custom category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        icon: { type: 'string' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Category does not belong to user',
  })
  async update(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute({
      userId,
      categoryId,
      name: updateCategoryDto.name,
      icon: updateCategoryDto.icon,
    });
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a custom category' })
  @ApiResponse({
    status: 204,
    description: 'Category deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Category does not belong to user',
  })
  async delete(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.deleteCategoryUseCase.execute({
      userId,
      categoryId,
    });
  }

  @Get(':categoryId/subcategories')
  @ApiOperation({ summary: 'List all subcategories for a category' })
  @ApiResponse({
    status: 200,
    description: 'Subcategories retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          categoryId: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async listSubcategories(@Param('categoryId') categoryId: string) {
    return this.listSubcategoriesUseCase.execute({ categoryId });
  }

  @Post(':categoryId/subcategories')
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiResponse({
    status: 201,
    description: 'Subcategory created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        categoryId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async createSubcategory(
    @Param('categoryId') categoryId: string,
    @Body() createSubcategoryDto: CreateSubcategoryDto,
  ) {
    return this.createSubcategoryUseCase.execute({
      categoryId,
      name: createSubcategoryDto.name,
    });
  }

  @Put(':categoryId/subcategories/:subcategoryId')
  @ApiOperation({ summary: 'Update a subcategory' })
  @ApiResponse({
    status: 200,
    description: 'Subcategory updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        categoryId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Subcategory not found' })
  async updateSubcategory(
    @Param('subcategoryId') subcategoryId: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.updateSubcategoryUseCase.execute({
      subcategoryId,
      name: updateSubcategoryDto.name,
    });
  }

  @Delete(':categoryId/subcategories/:subcategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a subcategory' })
  @ApiResponse({
    status: 204,
    description: 'Subcategory deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Subcategory not found' })
  async deleteSubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.deleteSubcategoryUseCase.execute({
      subcategoryId,
    });
  }
}
