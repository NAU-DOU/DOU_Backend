import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment-timezone';
export class RoomResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: 123,
  })
  userId: number;

  @ApiProperty({
    description: '사용자 닉네임',
    example: 'JohnDoe',
  })
  userNickname: string;

  @ApiProperty({
    description: '방의 감정 값',
    example: 3,
  })
  roomSent: number;

  @ApiProperty({
    description: '방 ID',
    example: 101,
  })
  roomId: number;

  @ApiProperty({
    description: '방 날짜',
    example: '2023-11-06',
  })
  roomDate: Date;

  @ApiProperty({
    description: '생성 일자',
    example: '2023-11-06T12:00:00Z',
  })
  createdAt: Date;

  constructor(partial: Partial<RoomResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RoomPatchResponseDto {
  @ApiProperty({
    description: '방 ID',
    example: 101,
  })
  roomId: number;

  @ApiProperty({
    description: '방 날짜 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: Date;

  @ApiProperty({
    description: '사용자 ID',
    example: 123,
  })
  userId: number;

  @ApiProperty({
    description: '방의 감정 값',
    example: 3,
  })
  roomSent: number;

  @ApiProperty({
    description: '업데이트된 일자 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<RoomPatchResponseDto>) {
    Object.assign(this, partial);
  }
}
