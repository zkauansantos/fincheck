import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Groceries',
    description: 'Category name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'shopping-cart',
    description: 'Category icon',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    example: TransactionType.EXPENSE,
    description: 'Transaction type (INCOME or EXPENSE)',
    enum: TransactionType,
    enumName: 'TransactionType',
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
