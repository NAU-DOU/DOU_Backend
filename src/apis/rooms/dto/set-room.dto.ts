import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import moment from 'moment';

export class SetRoomInputDto {
  @IsNotEmpty()
  @IsNumber()
  roomUserId: number;

  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}

export class UpdateRoomInputDto {
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}
