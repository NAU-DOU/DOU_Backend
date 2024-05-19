import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

import { winstonLogger } from './commons/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// async function bootstrap(): Promise<string> {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule, {
//     bufferLogs: true,
//     logger: winstonLogger,
//   });
//   await app.listen(process.env.NEST_PORT || 3000, '0.0.0.0');

//   return app.getUrl();
// }
// bootstrap();
