import { HttpException, Inject, Injectable, Logger, UseFilters } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GetSentimentInputDto } from './dto/get-sentiment.dto';
import { statusCode } from 'src/commons/exception/status.code';
import { CustomException } from 'src/commons/exception/custom.exception';

// 비즈니스 로직

/*
// CHECKLIST
// [ ] sentenceList -> \n을 기준으로 해 놨는데, 해당 부분이 어떻게 프론트에서 전달되는지 확인해야 함.
// [x] 지정값이 any인지 확인, 만약 any라면 적절한 형태 지정 필요
// [x] 에러 핸들링 설정
*/

@Injectable()
export class SentimentsService {
  constructor(private readonly httpService: HttpService) {}

  async getSentimentResult(data: GetSentimentInputDto): Promise<object> {
    const sentenceList = data.sentense.split('\n');

    return this.httpService.axiosRef
      .post(process.env.SENTIMENT_URL, { sentence: sentenceList })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new CustomException(statusCode.SENTIMENT_MODEL_NOT_FOUND, statusCode.SENTIMENT_MODEL_NOT_FOUND['status']);
      });
  }
}
