import { Catch, Injectable } from '@nestjs/common';
import { GetGptInputDto, GetGptSummaryDto } from './dto/get-gpt.dto';

import { GPTRequestQuery, GPTSentimentQuery, reqTypeNames } from './gpt-status.enum';

import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

// 비즈니스 로직

/*
// CHECKLIST
// [ ] Chat GPT 연결 서비스 생성

// 응답 enum: 0-요약, 1-일반 응답, 2-긍정 응답, 3-긍정 뉘앙스 변환 제안, 4-변환 후 확인
// 감정 enum: 0-행복, 1-놀람, 2-중립, 3-슬픔, 4-꺼림, 5-분노, 6-두려움
*/

@Injectable()
@Catch()
export class GptService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_KEY'),
    });
  }
  async setGPT(query: string): Promise<object> {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: '친구와 말하는 것처럼.' },
        { role: 'user', content: query },
      ],
      model: this.configService.get('OPENAI_MODEL'),
    });
    return chatCompletion;
  }

  async getGPTResponce(data: GetGptInputDto): Promise<object> {
    let gptQuery: string = '';

    // 감정 변환 응답 요청이 아닐 때!
    if (data.reqType.toString() != 'SENTIMENT_RESPONSE') {
      gptQuery = `"${data.context}" ${GPTRequestQuery[data.reqType]}`;
    } else {
      // 감정 변환 요청
      gptQuery = `"${data.context}" 이 문장에서 친구의 감정은 "${Object.values(GPTSentimentQuery)[data.reqSent]}"이야. 
      ${GPTRequestQuery[data.reqType]}`;
    }

    const result = await this.setGPT(gptQuery);
    return JSON.parse(result['choices'][0]['message']['content']);
  }

  async getGPTSummary(data: GetGptSummaryDto): Promise<object> {
    let gptQuery: string = '';
    gptQuery = `"${data.context}" ${GPTRequestQuery.SUMMARY} key값은 영문으로 해줘`;
    const result = await this.setGPT(gptQuery);

    return JSON.parse(result['choices'][0]['message']['content']);
  }
}
