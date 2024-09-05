import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRecordDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
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

export class GetRecordSelectDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
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

export class GetRecordInputDto {
  @IsNotEmpty()
  @IsNumber()
  recordId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
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
    return moment(value).format('YYYY.MM.DD');
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
