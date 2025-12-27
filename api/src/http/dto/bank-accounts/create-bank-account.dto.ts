import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { BankAccountType } from '../../../domain/enums/bank-account-type.enum';

export class CreateBankAccountDto {
  @ApiProperty({
    example: 'My Checking Account',
    description: 'Bank account name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1000.5,
    description: 'Initial balance of the bank account',
  })
  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @ApiProperty({
    example: BankAccountType.CHECKING,
    description: 'Type of the bank account',
    enum: BankAccountType,
    enumName: 'BankAccountType',
  })
  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @ApiProperty({
    example: '#FF5733',
    description: 'Color in hex format (#RRGGBB)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'color must be a valid hex color format (#RRGGBB)',
  })
  color: string;
}
