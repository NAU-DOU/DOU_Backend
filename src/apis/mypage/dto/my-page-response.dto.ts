import { ApiProperty } from '@nestjs/swagger';

export class MyRoomUseDateResDTO {
  @ApiProperty({
    description: '이용 기간',
    example: 1234,
  })
  useDate: number;
}
