import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetSentimentInputDto {
  @ApiProperty({
    description: '사용자 아이디 (인덱스 아이디)',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: '분석할 문장. 줄바꿈이 필요한 경우 `\\n`으로 표기하여 전달',
    example: '오늘 날씨가 좋네요! 기분이 좋아요.\n어제는 조금 우울했어요.',
  })
  @IsNotEmpty()
  @IsString()
  sentense: string;
}
