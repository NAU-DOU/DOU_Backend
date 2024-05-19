import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SentimentsModule } from './apis/sentiments/sentiments.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/exception/http-exception.filter';

import { CommonModule } from './commons/common.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './apis/auths/entities/user.entity';
// import { RecordEntity } from './apis/records/entities/record.entity';
// import { ChatEntity } from './apis/records/entities/chat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env 사용을 위함
    }),
    // TypeOrmModule.forRoot({
    //   retryAttempts: process.env.NODE_ENV === 'production' ? 10 : 1,
    //   type: process.env.DB_TYPE as 'mysql',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   database: process.env.DB_NAME,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   entities: [UserEntity, RecordEntity, ChatEntity],
    //   synchronize: process.env.NODE_ENV === 'production' ? false : true,
    //   logging: true,
    // }),
    CommonModule,
    SentimentsModule, // 감정 분석 모듈
  ],
  controllers: [],
  providers: [
    {
      // Custom Exception
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
