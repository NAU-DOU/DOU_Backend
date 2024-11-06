import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRecordDto {
  @ApiProperty({
    description: 'Record ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '채팅방 생성 일자 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => moment(value).format('YYYY.MM.DD'))
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: '채팅방 감정 값',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @ApiProperty({
    description: '채팅방 대화 내용 요약',
    example: '이 대화는 주로 긍정적인 내용을 담고 있습니다.',
  })
  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}

export class GetRecordSelectDto {
  @ApiProperty({
    description: 'Record ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '채팅방 생성 일자 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => moment(value).format('YYYY.MM.DD'))
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: '채팅방 감정 값',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @ApiProperty({
    description: '채팅방 대화 내용 요약',
    example: '이 대화는 주로 긍정적인 내용을 담고 있습니다.',
  })
  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}

export class GetRecordInputDto {
  @ApiProperty({
    description: 'Record ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '채팅방 생성 일자 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => moment(value).format('YYYY.MM.DD'))
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: '채팅방 감정 값',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @ApiProperty({
    description: '채팅방 대화 내용 요약',
    example: '이 대화는 주로 긍정적인 내용을 담고 있습니다.',
  })
  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}

export class GetRecordUpdateDto {
  @ApiProperty({
    description: 'Record ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @ApiProperty({
    description: '채팅방 생성 일자 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => moment(value).format('YYYY.MM.DD'))
  @IsDate()
  createdAt: string;

  @ApiProperty({
    description: '채팅방 감정 값',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @ApiProperty({
    description: '채팅방 대화 내용 요약',
    example: '이 대화는 주로 긍정적인 내용을 담고 있습니다.',
  })
  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}
