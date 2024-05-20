import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';

@Module({
  imports: [],
  controllers: [GptController],
  providers: [GptService],
})
export class GptModule {}
