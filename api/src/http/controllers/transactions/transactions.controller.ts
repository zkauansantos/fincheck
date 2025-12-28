import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { OptinalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe.pipe';
import { CreateTransactionUseCase } from '../../../application/usecases/transactions/create';
import { DeleteTransactionUseCase } from '../../../application/usecases/transactions/delete';
import { GetCategoryAnalyticsUseCase } from '../../../application/usecases/transactions/get-analytics';
import { ListTransactionsUseCase } from '../../../application/usecases/transactions/list';
import { UpdateTransactionUseCase } from '../../../application/usecases/transactions/update';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { ActiveUserId } from '../../../shared/decorators/activeUserId.decorator';
import { CreateTransactionDto } from '../../dto/transactions/create-transaction.dto';
import { UpdateTransactionDto } from '../../dto/transactions/update-transaction.dto';

@ApiTags('Transactions')
@ApiBearerAuth('swagger-auth')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly listTransactionsUseCase: ListTransactionsUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly getCategoryAnalyticsUseCase: GetCategoryAnalyticsUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all transactions for the authenticated user' })
  @ApiQuery({
    name: 'month',
    required: false,
    type: Number,
    description: 'Filter by month (1-12)',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: 'Filter by year',
  })
  @ApiQuery({
    name: 'bankAccountId',
    required: false,
    type: String,
    description: 'Filter by bank account ID',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: TransactionType,
    description: 'Filter by transaction type (INCOME or EXPENSE)',
  })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          bankAccountId: { type: 'string', format: 'uuid' },
          categoryId: { type: 'string', format: 'uuid', nullable: true },
          subcategoryId: { type: 'string', format: 'uuid', nullable: true },
          name: { type: 'string' },
          value: { type: 'number' },
          date: { type: 'string', format: 'date-time' },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(
    @ActiveUserId() userId: string,
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('bankAccountId') bankAccountId?: string,
    @Query('type') type?: TransactionType,
  ) {
    return this.listTransactionsUseCase.execute({
      userId,
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
      bankAccountId,
      type,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        bankAccountId: { type: 'string', format: 'uuid' },
        categoryId: { type: 'string', format: 'uuid', nullable: true },
        subcategoryId: { type: 'string', format: 'uuid', nullable: true },
        name: { type: 'string' },
        value: { type: 'number' },
        date: { type: 'string', format: 'date-time' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 404,
    description: 'Bank account or category not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Bank account or category does not belong to user',
  })
  async create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.createTransactionUseCase.execute({
      userId,
      name: createTransactionDto.name,
      value: createTransactionDto.value,
      date: new Date(createTransactionDto.date),
      type: createTransactionDto.type,
      bankAccountId: createTransactionDto.bankAccountId,
      categoryId: createTransactionDto.categoryId,
      subcategoryId: createTransactionDto.subcategoryId,
    });
  }

  @Put(':transactionId')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        bankAccountId: { type: 'string', format: 'uuid' },
        categoryId: { type: 'string', format: 'uuid', nullable: true },
        subcategoryId: { type: 'string', format: 'uuid', nullable: true },
        name: { type: 'string' },
        value: { type: 'number' },
        date: { type: 'string', format: 'date-time' },
        type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Transaction does not belong to user',
  })
  async update(
    @ActiveUserId() userId: string,
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.updateTransactionUseCase.execute({
      userId,
      transactionId,
      name: updateTransactionDto.name,
      value: updateTransactionDto.value,
      date: updateTransactionDto.date
        ? new Date(updateTransactionDto.date)
        : undefined,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
      subcategoryId: updateTransactionDto.subcategoryId,
    });
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({
    status: 204,
    description: 'Transaction deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Transaction does not belong to user',
  })
  async delete(
    @ActiveUserId() userId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.deleteTransactionUseCase.execute({
      userId,
      transactionId,
    });
  }

  @Get('analytics')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get category analytics for transactions in a given month',
  })
  @ApiQuery({
    name: 'year',
    required: true,
    type: Number,
    description: 'Year to filter transactions',
  })
  @ApiQuery({
    name: 'bankAccountId',
    required: false,
    type: String,
    description: 'Filter by bank account ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Category analytics retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string', format: 'uuid', nullable: true },
          totalAmount: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAnalytics(
    @ActiveUserId() userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('bankAccountId', OptinalParseUUIDPipe) bankAccountId?: string,
  ) {
    return this.getCategoryAnalyticsUseCase.execute({
      userId,
      year,
      bankAccountId,
    });
  }
}
