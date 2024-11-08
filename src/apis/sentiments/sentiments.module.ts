import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { SentimentsController } from './sentiments.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auths/auth.module';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [SentimentsController],
  providers: [SentimentsService, JwtKakaoAuthGuard],
})
export class SentimentsModule {}
