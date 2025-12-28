import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Grocery Shopping',
    description: 'Transaction name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 150.75,
    description: 'Transaction value',
  })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: '2025-12-27T00:00:00.000Z',
    description: 'Transaction date',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: TransactionType.EXPENSE,
    description: 'Type of the transaction',
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Bank account ID',
  })
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Category ID (optional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Subcategory ID (optional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  subcategoryId?: string;
}
