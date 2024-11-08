import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { AuthModule } from '../auths/auth.module';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

@Module({
  imports: [AuthModule],
  controllers: [GptController],
  providers: [GptService, JwtKakaoAuthGuard],
})
export class GptModule {}
