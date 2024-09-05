import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRoomDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: Date;

  @IsNotEmpty()
  @IsNumber()
  roomUserId: number;

  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}

export class GetRoomSelectDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: string;

  @IsNotEmpty()
  @IsNumber()
  roomUserId: number;

  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}
