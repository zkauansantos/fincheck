import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from 'src/application/usecases/auth/sign-in';
import { SignUpUseCase } from 'src/application/usecases/auth/sign-up';
import { SignInDto } from 'src/http/dto/auth/sign-in.dto';
import { SignUpDto } from 'src/http/dto/auth/sign-up.dto';
import { IsPublic } from 'src/shared/decorators/isPublic.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @IsPublic()
  @Post('signin')
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signin(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute({
      email: signInDto.email,
      password: signInDto.password,
    });
  }

  @IsPublic()
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  async signup(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute({
      name: signUpDto.name,
      email: signUpDto.email,
      password: signUpDto.password,
    });
  }
}
