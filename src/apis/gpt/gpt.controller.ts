import { Body, Controller, Post, Get, Res, Logger, Inject, Catch } from '@nestjs/common';

import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';

import { GptService } from './gpt.service';
import { GetGptInputDto, GetGptSummaryDto } from './dto/get-gpt.dto';

@Controller('gpt')
@Catch()
export class GptController {
  constructor(private readonly gptService: GptService) {}

  /**
   * GPT를 이용하여 응답 전달
   * - userId (number)
   * * 사용자 아이디 번호 (인덱스 번호)
   * - context (string)
   * * 감정 분석을 진행한 문장 혹은 사용자가 변환하고자 하는 문장
   * * 감정 분석 요청처럼 \n으로 구분하는 것이 아닌 그냥 변환 이전 문장을 요청하면 됨
   * - reqType (number)
   * * 어떤 종류의 응답을 요청하는지에 대한 데이터
   * * "COMMON_RESPONSE" - 일반 응답
   * * "HAPPY_RESPONSE" - 긍정 응답
   * * "SENTIMENT_RESPONSE" - 감정 응답(긍정 뉘앙스 변환 제안)
   * * "TRANSFORM_CONFIRM" - 변환 후 확인
   * - reqSent (number)
   * * 어떤 감정인지에 대한 데이터
   * * "행복", "놀람", "중립", "슬픔", "꺼림", "분노", "두려움"
   * @example ['gpt']
   */

  @Post()
  async getGPTResponseController(@Body() getGPTRequest: GetGptInputDto, @Res() response: Response) {
    const result: object = await this.gptService.getGPTResponce(getGPTRequest);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * GPT를 이용하여 내용 요약
   * * userId - 사용자 아이디
   * * context - 요약할 통문단 (STT 변환 후 해당 글 전체를 전달해주기만 하면 됨)
   * @example ['gpt/summary']
   */

  @Post('summary')
  async getGPTSummaryController(@Body() getGPTRequest: GetGptSummaryDto, @Res() response: Response) {
    const result: object = await this.gptService.getGPTSummary(getGPTRequest);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
