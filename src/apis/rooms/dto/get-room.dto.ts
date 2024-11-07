import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRoomDto {
  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: 'Room 날짜 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: Date;

  @ApiProperty({
    description: 'Room의 사용자 ID',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  roomUserId: number;

  @ApiProperty({
    description: 'Room의 감정 값',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}

export class GetRoomSelectDto {
  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: 'Room 날짜 (YYYY.MM.DD 형식)',
    example: '2023.11.06',
  })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: string;

  @ApiProperty({
    description: 'Room의 사용자 ID',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  roomUserId: number;

  @ApiProperty({
    description: 'Room의 감정 값',
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}
