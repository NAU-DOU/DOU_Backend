import { Global, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { LoggerContextMiddleware } from './logger/logger-context.middleware';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [Logger],
  exports: [Logger],
})
export class CommonModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
