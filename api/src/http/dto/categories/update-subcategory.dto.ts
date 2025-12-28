import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubcategoryDto {
  @ApiProperty({
    example: 'Organic Produce',
    description: 'Subcategory name',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
}
