import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordEntity } from './entities/record.entity';
import { RoomEntity } from '../rooms/entities/room.entity';
import { AuthModule } from '../auths/auth.module';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

/**
 * 녹음 관련 내용
 * 1. 집 생성(하나의 녹음)
 * 2. 녹음 기반으로 나뉜 방 생성
 * 3. 각 방에서 대화한 로그 기록 저장)\
 * */

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity, RoomEntity]), AuthModule],
  controllers: [RecordsController],
  providers: [RecordsService, JwtKakaoAuthGuard],
})
export class RecordsModule {}
