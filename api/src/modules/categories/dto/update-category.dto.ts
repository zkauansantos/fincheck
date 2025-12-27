import { ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Investimentos',
    description: 'Category name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'investment',
    description: 'Icon identifier',
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    enum: TransactionType,
    example: TransactionType.INCOME,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;
}
