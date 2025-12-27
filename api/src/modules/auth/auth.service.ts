import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositiories';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const jwtAcessToken = await this.generateJwtAcessToken(user.id);

    return { jwtAcessToken };
  }

  async signup(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    const emailAlreadyExists = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailAlreadyExists) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const jwtAcessToken = await this.generateJwtAcessToken(user.id);

    return { jwtAcessToken };
  }

  private generateJwtAcessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
