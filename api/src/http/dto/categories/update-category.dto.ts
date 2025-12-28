import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Updated Groceries',
    description: 'Category name',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'shopping-bag',
    description: 'Category icon',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  icon?: string;
}
