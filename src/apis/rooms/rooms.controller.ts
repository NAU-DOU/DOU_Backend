import { Body, Controller, Get, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { RoomEntity } from './entities/room.entity';
import { GetRoomDto } from './dto/get-room.dto';
import { SetRoomInputDto, UpdateRoomInputDto } from './dto/set-room.dto';
import { RoomsService } from './rooms.service';

@Controller('room')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  /**
   * TEST - Room의 모든 데이터 가져오기
   * @example ['record']
   */
  @Get('test')
  async getAll(@Res() response: Response) {
    const result: GetRoomDto[] = await this.roomsService.findAll();

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Room 조회 (여러 개)
   * 날짜 별로 채팅 조회
   * @example ['room/date']
   */
  @Get('date')
  async getRoomToDate(@Query('date') date: string, @Res() response: Response) {
    const result: RoomEntity[] = await this.roomsService.findRoomsToDate(date);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Room 조회 (한 개)
   * Room Id로 해당 Room 조회
   * @example ['room/id']
   */
  @Get('id')
  async getRoomToId(@Query('roomId') id: number, @Res() response: Response) {
    const result: RoomEntity = await this.roomsService.findRoomToId(id);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Room 추가 -
   * 채팅 생성
   * @example ['room']
   */
  @Post('')
  async setRoomToId(@Body() setRoomInputDto: SetRoomInputDto, @Res() response: Response) {
    const result: RoomEntity = await this.roomsService.setRoomToId(setRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Room 데이터 수정
   * roomId 바탕으로 해당 기록의 전반적인 감정 수정
   * @example ['room/:roomId']
   */
  @Patch('')
  async updateRoomSent(@Body() updateRoomInputDto: UpdateRoomInputDto, @Res() response: Response) {
    const result: RoomEntity = await this.roomsService.updateRoomToId(updateRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
