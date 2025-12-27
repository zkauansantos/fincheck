import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function buildSwaggerConfig(app: INestApplication) {
  try {
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
    return true;
  } catch {
    return false;
  }
}
