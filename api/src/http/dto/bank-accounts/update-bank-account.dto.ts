import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateBankAccountDto {
  @ApiProperty({
    example: 'My Updated Account',
    description: 'Bank account name',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 2500.75,
    description: 'Initial balance of the bank account',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  initialBalance?: number;

  @ApiProperty({
    example: '#3366FF',
    description: 'Color in hex format (#RRGGBB)',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'color must be a valid hex color format (#RRGGBB)',
  })
  color?: string;
}
