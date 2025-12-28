import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    example: 'Fresh Produce',
    description: 'Subcategory name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
