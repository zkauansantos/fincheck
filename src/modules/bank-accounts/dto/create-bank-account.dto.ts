import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: string;

  // type: '' | '';

  @IsString()
  @IsNotEmpty()
  color: string;
}
