import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { DisableCacheMiddleware } from './http/middlewares/disable-cache.middleware';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DisableCacheMiddleware).forRoutes('*');
  }
}
