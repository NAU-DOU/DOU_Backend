import { Body, Controller, Get, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { RoomEntity } from './entities/room.entity';
import { GetRoomDto, GetRoomSelectDto } from './dto/get-room.dto';
import { SetRoomInputDto, UpdateRoomInputDto } from './dto/set-room.dto';
import { RoomsService } from './rooms.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { resolveObjectURL } from 'buffer';
import { RoomPatchResponseDto, RoomResponseDto } from './dto/room-response.dto';

@ApiTags('Room (날짜 관련 API) - 날짜 별로 분류')
@Controller('room')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  /**
   * ## Room의 모든 데이터 가져오기 (roomId 순서대로 전달) - 가장 최신 것부터
   * - cursorId: 없이 보내도 됨 (맨 처음 조회 시), 이후 데이터에 전달되는 cursorId 그대로 쿼리에 추가하면 됨
   * - limit: 몇 개씩 가져올 지 (default: 10개)
   */
  @Get('')
  @ApiQuery({ name: 'cursorId', required: false })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getAllRooms(
    @Query('cursorId') cursorId: number = -1,
    @Query('limit') limit: number = 10,
    @Res() response: Response,
  ) {
    const result: { data: GetRoomSelectDto[]; cursor: number } = await this.roomsService.getAllRoom(cursorId, limit);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      cursorId: result.cursor,
    });
  }

  /**
   * Room 조회 (여러 개)
   * 사용자 아이디 별로 채팅 조회
   * - cursorId: 없이 보내도 됨 (맨 처음 조회 시), 이후 데이터에 전달되는 cursorId 그대로 쿼리에 추가하면 됨
   * - limit: 몇 개씩 가져올 지 (default: 10개)
   */
  @Get('user')
  @ApiQuery({ name: 'userId', required: true, example: 1 })
  @ApiQuery({ name: 'cursorId', required: false })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getRoomToUser(
    @Query('userId') userId: number,
    @Query('cursorId') cursorId: number = -1,
    @Query('limit') limit: number = 10,
    @Res() response: Response,
  ) {
    const result: { data: GetRoomSelectDto[]; cursor: number } = await this.roomsService.findRoomsToUser(
      cursorId,
      limit,
      userId,
    );

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      cursorId: result.cursor,
    });
  }

  /**
   * Room 조회 (여러 개)
   * 날짜 별로 조회
   * - cursorId: 없이 보내도 됨 (맨 처음 조회 시), 이후 데이터에 전달되는 cursorId 그대로 쿼리에 추가하면 됨
   * - limit: 몇 개씩 가져올 지 (default: 10개)
   */
  @Get('date')
  @ApiQuery({ name: 'date', required: true, example: '2024-08-29' })
  @ApiQuery({ name: 'cursorId', required: false })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getRoomToDate(
    @Query('date') date: string,
    @Query('cursorId') cursorId: number = -1,
    @Query('limit') limit: number = 10,
    @Res() response: Response,
  ) {
    const result: { data: GetRoomSelectDto[]; cursor: number } = await this.roomsService.findRoomsToDate(
      cursorId,
      limit,
      date,
    );

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      cursorId: result.cursor,
    });
  }

  /**
   * Room 조회 (한 개)
   * Room Id로 해당 Room 조회
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
   */
  @Post('')
  async setRoomToId(@Body() setRoomInputDto: SetRoomInputDto, @Res() response: Response) {
    const result: RoomResponseDto = await this.roomsService.setRoomToId(setRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Room 데이터 수정
   * roomId 바탕으로 해당 기록의 전반적인 감정 수정
   */
  @Patch('')
  async updateRoomSent(@Body() updateRoomInputDto: UpdateRoomInputDto, @Res() response: Response) {
    const result: RoomPatchResponseDto = await this.roomsService.updateRoomToId(updateRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
