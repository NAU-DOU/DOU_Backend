import { Body, Controller, Post, Get, Res, Logger, Inject } from '@nestjs/common';

import { GetSentimentInputDto } from './dto/get-sentiment.dto';
// import { SentimentResult } from './interfaces/sentiments-service.interface'; // NOTE: 인터페이스를 어디에다 쓰는지 좀 알아봐야 할 필요성이 있음
import { SentimentsService } from './sentiments.service';
import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';

/**
 * A list about sentiment
 * @example ['sentiment']
 */
@Controller('sentiment')
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  @Get()
  getAll(@Res() response: Response) {
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: process.env.SENTIMENT_URL,
    });
  }

  // FIXME: any말고 객체에 적절한 응답 값을 리턴할 수 있도록 형태 지정해야 함
  // NOTE: Swagger API 작성 마저 하기
  @Post()
  async getSentimentResult(@Body() getSentimentInput: GetSentimentInputDto, @Res() response: Response) {
    const result: object = await this.sentimentsService.getSentimentResult(getSentimentInput);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
