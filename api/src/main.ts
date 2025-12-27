import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

const APP_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Fincheck API')
    .setDescription(
      'API for personal financial management with annual budget tracking',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'swagger-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    customSiteTitle: 'Fincheck API Documentation',
  });

  await app.listen(APP_PORT);

  console.log(`🚀 Application is running on: http://localhost:${APP_PORT}`);
  console.log(
    '📚 Application documentation is running on: http://localhost:3000/docs',
  );
}
bootstrap();
