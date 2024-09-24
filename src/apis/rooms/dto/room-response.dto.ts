import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import * as moment from 'moment-timezone';
export class RoomResponseDto {
  userId: number;
  userNickname: string;
  roomSent: number;
  roomId: number;
  roomDate: Date;
  createdAt: Date;

  constructor(partial: Partial<RoomResponseDto>) {
    Object.assign(this, partial);
  }
}

export class RoomPatchResponseDto {
  roomId: number;

  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  roomDate: Date;

  userId: number;
  roomSent: number;

  @Transform(({ value }) => {
    return moment(value).format('YYYY.MM.DD');
  })
  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<RoomPatchResponseDto>) {
    Object.assign(this, partial);
  }
}
