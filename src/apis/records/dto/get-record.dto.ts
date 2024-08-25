import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRecordDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment.tz(value, 'YYYY.MM.DD', 'Asia/Seoul').toDate();
  })
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @IsNotEmpty()
  @IsString()
  recordSummary: string;

  @IsNotEmpty()
  @IsNumber()
  chatId: number;
}

export class GetRecordInputDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).tz('Asia/Seoul').format('YYYY.MM.DD');
  })
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}

// 업데이트
export class GetRecordUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment.tz(value, 'YYYY.MM.DD', 'Asia/Seoul').toDate();
  })
  @IsDate()
  createdAt: string;

  @IsNotEmpty()
  @IsNumber()
  recordSent: number;

  @IsNotEmpty()
  @IsString()
  recordSummary: string;
}
