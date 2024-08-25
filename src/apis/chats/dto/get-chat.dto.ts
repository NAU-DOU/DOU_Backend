import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetChatDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).tz('Asia/Seoul').format('YYYY.MM.DD');
  })
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsNumber()
  chatSent: number;

  @IsNotEmpty()
  @IsNumber()
  isUser: number;

  @IsNotEmpty()
  @IsString()
  chatContext: string;
}

export class GetChatInputDto {
  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).tz('Asia/Seoul').format('YYYY.MM.DD');
  })
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @IsNumber()
  chatSent: number;

  @IsNotEmpty()
  @IsNumber()
  isUser: number;

  @IsNotEmpty()
  @IsString()
  chatContext: string;
}
