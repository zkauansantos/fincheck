import { Module } from '@nestjs/common';
import { GetMeUseCase } from '../../../application/usecases/users/getMe';
import { PrismaModule } from '../../../infrastructure/database/prisma/prisma.module';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [GetMeUseCase],
})
export class UsersModule {}
