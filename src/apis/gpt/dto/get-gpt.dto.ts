import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GPTSentimentQuery, reqTypeNames } from '../gpt-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetGptInputDto {
  @ApiProperty({
    description: '사용자 아이디 번호 (인덱스 번호)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: '감정 분석을 진행할 문장 혹은 변환하고자 하는 문장',
    example: '오늘 기분이 어떠세요?',
  })
  @IsNotEmpty()
  @IsString()
  context: string;

  @ApiProperty({
    description: '응답 유형을 지정하는 데이터',
    example: 'COMMON_RESPONSE', // 가능한 값 중 하나를 예시로 표시
    enum: reqTypeNames, // enum을 설정하여 Swagger에서 선택 가능한 값을 보여줌
  })
  @IsNotEmpty()
  @IsEnum(reqTypeNames)
  reqType: reqTypeNames;

  @ApiProperty({
    description: '감정 유형을 지정하는 데이터',
    example: '행복', // 가능한 감정 중 하나를 예시로 표시
    enum: GPTSentimentQuery, // enum을 설정하여 Swagger에서 선택 가능한 값을 보여줌
  })
  @IsNotEmpty()
  @IsEnum(GPTSentimentQuery)
  reqSent: GPTSentimentQuery;
}

export class GetGptSummaryDto {
  @ApiProperty({
    description: '사용자 아이디 번호 (인덱스 번호)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: '요약을 요청할 문장 혹은 텍스트 내용',
    example:
      '오늘은 일어나서 학교에 갔어. 늦을 뻔 했지 뭐야. 하지만 다행히도 원래부터 10분 늦게 시작하는 수업이라 늦지 않을 수 있었어. 사실, 학교 버스를 기다렸다면 아슬아슬했을 수도 있는데, 그냥 버스를 타고 와서 여유롭게 올 수 있었던 것 같아.',
  })
  @IsNotEmpty()
  @IsString()
  context: string;
}
