import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../../../../domain/entities/user.entity';
import { ValidationException } from '../../../../domain/exceptions/validation.exception';
import { UserRepository } from '../../../../domain/repositories/user.repository.interface';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Password } from '../../../../domain/value-objects/password.vo';
import { InjectRepository } from '../../../../shared/decorators/inject-repository.decorator';
import { UseCase } from '../../usecase';
import { SignUpUseCaseInput } from './input';
import { SignUpUseCaseOutput } from './output';

@Injectable()
export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, Promise<SignUpUseCaseOutput>>
{
  constructor(
    @InjectRepository('USERS')
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const { name, email, password } = input;

    const emailExists = await this.usersRepository.existsByEmail(email);

    if (emailExists) {
      throw ValidationException.emailAlreadyExists(email);
    }

    const hashedPassword = await Password.createFromPlain(password);

    const user = User.create({
      id: randomUUID(),
      name,
      email: Email.create(email),
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const accessToken = this.jwtService.sign({
      sub: user.getId(),
    });

    return { accessToken };
  }
}
