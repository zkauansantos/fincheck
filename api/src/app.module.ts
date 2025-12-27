import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
})
export class AppModule {}
