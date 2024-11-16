import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MyPageController } from './mypage.controller';
import { MyPageService } from './mypage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auths/entities/user.entity';
import { AuthModule } from '../auths/auth.module';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';
import { RoomEntity } from '../rooms/entities/room.entity';

/**
 * 마이페이지 관련
 * 1. 사용자 사용 기간 응답 API
 * 2. 사용자 감정 개수 전달 API
 * */

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, UserEntity]), AuthModule],
  controllers: [MyPageController],
  providers: [MyPageService, JwtKakaoAuthGuard],
})
export class MyPageModule {}
