import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserQueryRepository } from './entities/user.query.repository';
import { JwtAuthGuard, JwtKakaoAuthGuard, KakaoStrategy } from './strategies/kakao.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

/**
 * 채팅(세부 대화 내용_로그) 관련 내용
 * 1. 집 생성(하나의 녹음)
 * 2. 녹음 기반으로 나뉜 방 생성
 * 3. 각 방에서 대화한 로그 기록 저장)\
 * */

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'kakao' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY, // 액세스 토큰 비밀 키
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }, // JWT 만료 시간 설정
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserQueryRepository, KakaoStrategy, JwtKakaoAuthGuard],
  exports: [UserQueryRepository, JwtModule, JwtKakaoAuthGuard],
})
export class AuthModule {}
