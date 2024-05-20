import { Body, Controller, Post, Get, Res, Logger, Inject, Catch } from '@nestjs/common';

import { statusCode } from 'src/commons/exception/status.code';
import { Response } from 'express';

import { GptService } from './gpt.service';
import { GetGptInputDto } from './dto/get-gpt-dto';

@Controller('gpt')
@Catch()
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post()
  async getGPTResponse(@Body() getGPTRequest: GetGptInputDto, @Res() response: Response) {
    const result: object = await this.gptService.getGPTResponce(getGPTRequest);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
