import { Body, Controller, Post, Get, Res, Logger, Inject, Catch, UseGuards } from '@nestjs/common';

import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';

import { GptService } from './gpt.service';
import { GetGptInputDto, GetGptSummaryDto } from './dto/get-gpt.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

@ApiTags('GPT API (도우 응답 관련)')
@Controller('gpt')
@Catch()
export class GptController {
  constructor(private readonly gptService: GptService) {}

  /**
   * ## GPT를 이용하여 사용자 요청에 대한 응답 전달
   *
   * ### 요청 데이터
   * - **userId** (number): 사용자 아이디 번호 (인덱스 번호)
   * - **context** (string):
   *   - 감정 분석을 진행할 문장 혹은 변환하고자 하는 문장.
   *   - 요청 시 `\n`으로 구분하지 않고, 변환 전의 원래 문장을 그대로 전달합니다.
   * - **reqType** (Enum): 응답 유형을 나타내는 데이터
   *   - "COMMON_RESPONSE": 일반 응답
   *   - "HAPPY_RESPONSE": 긍정 응답
   *   - "SENTIMENT_RESPONSE": 감정 응답 (긍정 뉘앙스로 변환된 제안)
   *   - "TRANSFORM_CONFIRM": 변환 후 확인
   * - **reqSent** (Enum): 요청한 감정 유형
   *
   *   - `행복`, `놀람`, `중립`, `슬픔`, `꺼림`, `분노`, `두려움` 중 하나를 선택
   *
   */
  @ApiOperation({ summary: 'GPT 응답(도우 응답) API' })
  @ApiBody({ type: GetGptInputDto, description: 'GPT 응답을 위한 전달 내용' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtKakaoAuthGuard)
  async getGPTResponseController(@Body() getGPTRequest: GetGptInputDto, @Res() response: Response) {
    const result: object = await this.gptService.getGPTResponce(getGPTRequest);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## GPT를 이용하여 내용 요약
   *
   * 도우에게 한 음성 TTS 전문을 전달 받아 해당 내용을 요약한다.
   *
   * - **userId** (number): 사용자 아이디 번호 (인덱스 번호)
   *  - **context** (string): 요약할 문단 (STT 변환 후 해당 글 전체를 전달해주기만 하면 됨)
   */
  @ApiOperation({ summary: 'GPT를 이용한 녹음 내용 요약 API' })
  @ApiBody({ type: GetGptSummaryDto, description: 'GPT를 이용하여 내용 요약' })
  @ApiBearerAuth()
  @UseGuards(JwtKakaoAuthGuard)
  @Post('summary')
  async getGPTSummaryController(@Body() getGPTRequest: GetGptSummaryDto, @Res() response: Response) {
    const result: object = await this.gptService.getGPTSummary(getGPTRequest);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
