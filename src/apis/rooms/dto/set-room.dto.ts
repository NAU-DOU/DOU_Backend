import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import moment from 'moment';

export class SetRoomInputDto {
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

export class UpdateRoomInputDto {
  @ApiProperty({
    description: 'Room ID',
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    description: '업데이트할 Room의 감정 값',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  roomSent: number;
}
