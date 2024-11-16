import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SentimentsModule } from './apis/sentiments/sentiments.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/exception/http-exception.filter';

import { CommonModule } from './commons/common.module';
import { HealthModule } from './apis/health/health.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './apis/auths/entities/user.entity';
import { RecordEntity } from './apis/records/entities/record.entity';
import { ChatEntity } from './apis/chats/entities/chat.entity';
import { RoomEntity } from './apis/rooms/entities/room.entity';

import { GptModule } from './apis/gpt/gpt.module';
import { RecordsModule } from './apis/records/records.module';
import { RoomsModule } from './apis/rooms/rooms.module';
import { ChatsModule } from './apis/chats/chats.module';
import { AuthModule } from './apis/auths/auth.module';
import { MyPageModule } from './apis/mypage/mypage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env 사용을 위함
    }),
    TypeOrmModule.forRoot({
      retryAttempts: process.env.NODE_ENV === 'production' ? 10 : 1,
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [UserEntity, RecordEntity, ChatEntity, RoomEntity],
      synchronize: true,
      timezone: 'Asia/Seoul',
      // synchronize: process.env.NODE_ENV === 'production' ? false : true,
      logging: true,
    }),
    CommonModule,
    SentimentsModule, // 감정 분석 모듈
    HealthModule, // Health Check
    GptModule, // GPT 응답 요청 모듈
    RecordsModule, // Record 관련 모듈 - 세부 분류
    RoomsModule, // 방 관련 모듈 - 대화
    ChatsModule, // Chat 관련 모듈 - log
    AuthModule, // 소셜로그인 관련 모듈
    MyPageModule, // 마이페이지 관련 모듈
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
