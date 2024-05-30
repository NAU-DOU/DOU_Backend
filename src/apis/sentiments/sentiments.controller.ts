import { Body, Controller, Post, Get, Res, Logger, Inject } from '@nestjs/common';

import { GetSentimentInputDto } from './dto/get-sentiment.dto';
// import { SentimentResult } from './interfaces/sentiments-service.interface'; // NOTE: 인터페이스를 어디에다 쓰는지 좀 알아봐야 할 필요성이 있음
import { SentimentsService } from './sentiments.service';
import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';

@Controller('sentiment')
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  /**
   * Sentiment 테스트
   * @example ['sentiment']
   */
  @Get()
  getAll(@Res() response: Response) {
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: process.env.SENTIMENT_URL,
    });
  }

  /**
   * 감정 분석 요청
   * - userId
   * * 사용자 아이디 (인덱스 아이디)
   * - sentence
   * * 통 문장 넘겨주되 줄바꿈의 경우 \n으로 변환 혹은 표기하여 넣어주기
   * @example ['sentiment']
   */
  @Post()
  async getSentimentResult(@Body() getSentimentInput: GetSentimentInputDto, @Res() response: Response) {
    const result: object = await this.sentimentsService.getSentimentResult(getSentimentInput);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
