import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SentimentsModule } from './apis/sentiments/sentiments.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/exception/http-exception.filter';

import { CommonModule } from './commons/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env 사용을 위함
    }),
    CommonModule,
    SentimentsModule, // 감정 분석 모듈
  ],
  providers: [
    {
      // Custom Exception
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
