import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../../domain/repositories/user.repository.interface';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { AuthenticationException } from '../../../exceptions/authentication.exception';
import { UseCase } from '../../usecase';
import { SignInUseCaseInput } from './input';
import { SignInUseCaseOutput } from './output';

@Injectable()
export class SignInUseCase
  implements UseCase<SignInUseCaseInput, Promise<SignInUseCaseOutput>>
{
  constructor(
    @InjectRepository('USERS')
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const { email, password } = input;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw AuthenticationException.invalidCredentials();
    }

    const isPasswordValid = await user.getPassword().compareWith(password);

    if (!isPasswordValid) {
      throw AuthenticationException.invalidCredentials();
    }

    const accessToken = this.jwtService.sign({
      sub: user.getId(),
    });

    return { accessToken };
  }
}
