import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { winstonLogger } from './commons/logger/logger.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: winstonLogger,
  });

  // Swagger
  const config = new DocumentBuilder().setTitle('API 문서').setDescription('DOU-API 문서').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.NEST_PORT || 3000, '0.0.0.0');

  return app.getUrl();
}
bootstrap();
