import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

import isPublic from 'src/shared/decorators/isPublic.decorator';

@ApiTags('Auth')
@isPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
}
