import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { SentimentsController } from './sentiments.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SentimentsController],
  providers: [SentimentsService],
})
export class SentimentsModule {}
