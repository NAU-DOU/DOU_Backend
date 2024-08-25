import { Module } from '@nestjs/common';
import { ChatEntity } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../rooms/entities/room.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { RecordEntity } from '../records/entities/record.entity';

/**
 * 채팅(세부 대화 내용_로그) 관련 내용
 * 1. 집 생성(하나의 녹음)
 * 2. 녹음 기반으로 나뉜 방 생성
 * 3. 각 방에서 대화한 로그 기록 저장)\
 * */

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, RecordEntity, RoomEntity])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
