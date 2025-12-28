import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { SignInUseCase } from 'src/application/usecases/auth/sign-in';
import { SignUpUseCase } from 'src/application/usecases/auth/sign-up';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { PrismaModule } from 'src/infrastructure/database/prisma/prisma.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
