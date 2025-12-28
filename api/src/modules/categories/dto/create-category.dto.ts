import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Investimentos', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'investment', description: 'Icon identifier' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.INCOME,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
