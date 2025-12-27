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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBankAccountUseCase } from '../../../application/usecases/bank-accounts/create';
import { DeleteBankAccountUseCase } from '../../../application/usecases/bank-accounts/delete';
import { ListBankAccountsUseCase } from '../../../application/usecases/bank-accounts/list';
import { UpdateBankAccountUseCase } from '../../../application/usecases/bank-accounts/update';
import { ActiveUserId } from '../../../shared/decorators/activeUserId.decorator';
import { CreateBankAccountDto } from '../../dto/bank-accounts/create-bank-account.dto';
import { UpdateBankAccountDto } from '../../dto/bank-accounts/update-bank-account.dto';

@ApiTags('Bank Accounts')
@ApiBearerAuth('swagger-auth')
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly listBankAccountsUseCase: ListBankAccountsUseCase,
    private readonly updateBankAccountUseCase: UpdateBankAccountUseCase,
    private readonly deleteBankAccountUseCase: DeleteBankAccountUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List all bank accounts for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Bank accounts retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          initialBalance: { type: 'number' },
          type: { type: 'string', enum: ['CHECKING', 'CASH', 'INVESTMENT'] },
          color: { type: 'string', pattern: '^#[0-9A-F]{6}$' },
          currentBalance: { type: 'number' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async list(@ActiveUserId() userId: string) {
    return this.listBankAccountsUseCase.execute({ userId });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiResponse({
    status: 201,
    description: 'Bank account created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        initialBalance: { type: 'number' },
        type: { type: 'string', enum: ['CHECKING', 'CASH', 'INVESTMENT'] },
        color: { type: 'string', pattern: '^#[0-9A-F]{6}$' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.createBankAccountUseCase.execute({
      userId,
      name: createBankAccountDto.name,
      initialBalance: createBankAccountDto.initialBalance,
      type: createBankAccountDto.type,
      color: createBankAccountDto.color,
    });
  }

  @Put(':bankAccountId')
  @ApiOperation({ summary: 'Update a bank account' })
  @ApiResponse({
    status: 200,
    description: 'Bank account updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        initialBalance: { type: 'number' },
        type: { type: 'string', enum: ['CHECKING', 'CASH', 'INVESTMENT'] },
        color: { type: 'string', pattern: '^#[0-9A-F]{6}$' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Bank account not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Bank account does not belong to user',
  })
  async update(
    @ActiveUserId() userId: string,
    @Param('bankAccountId') bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.updateBankAccountUseCase.execute({
      userId,
      bankAccountId,
      name: updateBankAccountDto.name,
      initialBalance: updateBankAccountDto.initialBalance,
      color: updateBankAccountDto.color,
    });
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a bank account' })
  @ApiResponse({
    status: 204,
    description: 'Bank account deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Bank account not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Bank account does not belong to user',
  })
  async delete(
    @ActiveUserId() userId: string,
    @Param('bankAccountId') bankAccountId: string,
  ) {
    return this.deleteBankAccountUseCase.execute({
      userId,
      bankAccountId,
    });
  }
}
