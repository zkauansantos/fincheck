import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty({
    example: 'Updated Transaction Name',
    description: 'Transaction name',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 200.5,
    description: 'Transaction value',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  value?: number;

  @ApiProperty({
    example: '2025-12-27T00:00:00.000Z',
    description: 'Transaction date',
    required: false,
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  date?: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Bank account ID',
    required: false,
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  bankAccountId?: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Category ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6',
    description: 'Subcategory ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  subcategoryId?: string;
}
