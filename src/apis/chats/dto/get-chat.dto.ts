import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetChatDto {
  @ApiProperty({
    description: '채팅 ID',
    example: 123, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @ApiProperty({
    description: '생성일 (YYYY.MM.DD 형식)',
    example: '2023.11.06', // 기본 예시 값
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: '기록 ID',
    example: 1001, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '감정 값 (채팅의 감정 점수)',
    example: 3, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  chatSent: number;

  @ApiProperty({
    description: '발화자 유형 (1: 사용자, 0: 로봇)',
    example: 1, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  isUser: number;

  @ApiProperty({
    description: '채팅 내용',
    example: '안녕하세요! 오늘 기분이 어떠신가요?', // 기본 예시 값
  })
  @IsNotEmpty()
  @IsString()
  chatContext: string;
}

export class GetChatInputDto {
  @ApiProperty({
    description: '채팅 ID',
    example: 123, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @ApiProperty({
    description: '생성일 (YYYY.MM.DD 형식)',
    example: '2023.11.06', // 기본 예시 값
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: '기록 ID',
    example: 1001, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '감정 값 (채팅의 감정 점수)',
    example: 3, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  chatSent: number;

  @ApiProperty({
    description: '발화자 유형 (1: 사용자, 0: 로봇)',
    example: 1, // 기본 예시 값
  })
  @IsNotEmpty()
  @IsNumber()
  isUser: number;

  @ApiProperty({
    description: '채팅 내용',
    example: '안녕하세요! 오늘 기분이 어떠신가요?', // 기본 예시 값
  })
  @IsNotEmpty()
  @IsString()
  chatContext: string;
}
