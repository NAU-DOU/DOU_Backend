import { Catch, HttpException, Inject, Injectable, Logger, UseFilters } from '@nestjs/common';

import { statusCode } from 'src/commons/exception/status.code';
import { CustomException } from 'src/commons/exception/custom.exception';
import { GetGptInputDto } from './dto/get-gpt-dto';

import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

// 비즈니스 로직

/*
// CHECKLIST
// [ ] Chat GPT 연결 서비스 생성
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
  async getGPTResponce(data: GetGptInputDto): Promise<object> {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [
        { role: 'system', content: '친구와 말하는 것처럼.' },
        { role: 'user', content: data.context },
      ],
      model: this.configService.get('OPENAI_MODEL'),
    });
    return chatCompletion;
  }
}
