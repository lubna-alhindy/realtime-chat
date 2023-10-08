import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API Docs')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('ia-proj1')
        .addBearerAuth(
          {
            description: 'Default JWT Authorization',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          },
          'access-token'
        )
        .build(),
      {
        operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
      }
    )
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: (_, callback) => {
      callback(null, true);
    }
  });

  await app.listen(4000);
}

bootstrap();
