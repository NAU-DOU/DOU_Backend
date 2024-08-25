import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment-timezone';

export class GetRoomDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return moment.tz(value, 'YYYY.MM.DD', 'Asia/Seoul').toDate();
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
