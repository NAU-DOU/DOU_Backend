import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserQueryRepository } from './entities/user.query.repository';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { PassportModule } from '@nestjs/passport';

/**
 * 채팅(세부 대화 내용_로그) 관련 내용
 * 1. 집 생성(하나의 녹음)
 * 2. 녹음 기반으로 나뉜 방 생성
 * 3. 각 방에서 대화한 로그 기록 저장)\
 * */

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule.register({ defaultStrategy: 'kakao' })],
  controllers: [AuthController],
  providers: [AuthService, UserQueryRepository, KakaoStrategy],
  exports: [UserQueryRepository],
})
export class AuthModule {}
