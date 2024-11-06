import { Body, Controller, Post, Get, Res, Logger, Inject } from '@nestjs/common';

import { GetSentimentInputDto } from './dto/get-sentiment.dto';
// import { SentimentResult } from './interfaces/sentiments-service.interface'; // NOTE: 인터페이스를 어디에다 쓰는지 좀 알아봐야 할 필요성이 있음
import { SentimentsService } from './sentiments.service';
import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('감정 분석 모델 사용 API')
@Controller('sentiment')
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  /**
   * ## 감정 분석 모델 서버가 잘 돌아가는지 여부 확인용
   */
  @Get()
  getAll(@Res() response: Response) {
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: process.env.SENTIMENT_URL,
    });
  }

  /**
   * ## 감정 분석 모델에게 감정 분석 요청
   *
   * ### 요청 필드
   * - **userId**: 사용자 아이디 (인덱스 아이디)
   * - **sentence**: 분석할 문장
   *   - 문장을 그대로 전달하며, 줄바꿈이 필요한 경우 `\n`으로 표기하여 넣어주기
   *
   * ### 응답 데이터
   * - **sentence**: 감정 분석 문장 (string)
   * - **sentiment**: 감정 (string)
   * - **sentiment_idx**: 위의 감정에 대응하는 숫자값(인덱스) (number)
   * */
  @ApiBody({ type: GetSentimentInputDto, description: '감정 분석을 위한 전달 내용' })
  @Post()
  async getSentimentResult(@Body() getSentimentInput: GetSentimentInputDto, @Res() response: Response) {
    const result: object = await this.sentimentsService.getSentimentResult(getSentimentInput);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
