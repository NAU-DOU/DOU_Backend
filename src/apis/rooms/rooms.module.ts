import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { UserEntity } from '../auths/entities/user.entity';
import { AuthModule } from '../auths/auth.module';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

/**
 * 녹음 관련 내용
 * 1. 집 생성(하나의 녹음)
 * 2. 녹음 기반으로 나뉜 방 생성
 * 3. 각 방에서 대화한 로그 기록 저장)\
 * */

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, UserEntity]), AuthModule],
  controllers: [RoomsController],
  providers: [RoomsService, JwtKakaoAuthGuard],
})
export class RoomsModule {}
