import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { buildSwaggerConfig } from './docs/swaggerConfig';

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();

  app.enableCors({
    origin: '*',
  });

  const isSwaggerBuilded = buildSwaggerConfig(app);

  await app.listen(APP_PORT);

  if (isSwaggerBuilded) {
    console.log(`🚀 Application is running on: http://localhost:${APP_PORT}`);
    console.log(
      '📚 Application documentation is running on: http://localhost:3000/docs',
    );
  }
}
bootstrap();
