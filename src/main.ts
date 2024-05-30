import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { winstonLogger } from './commons/logger/logger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
    cors: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API 문서')
    .setDescription('DOU-API 문서')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local Env')
    .addServer('https://dev.nau-dou.shop/', 'Dev Env')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의된 값만 허용
      forbidNonWhitelisted: true, // 정의되지 않은 값이 있으면 요청 거부
      transform: true, // 요청 데이터를 DTO 타입으로 자동 변환
    }),
  );

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.NEST_PORT || 3000, '0.0.0.0');

  return app.getUrl();
}
bootstrap();
