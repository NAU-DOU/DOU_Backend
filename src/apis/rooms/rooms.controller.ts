import { Body, Controller, Get, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { response, Response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { RoomEntity } from './entities/room.entity';
import { GetRoomDto, GetRoomSelectDto } from './dto/get-room.dto';
import { SetRoomInputDto, UpdateRoomInputDto } from './dto/set-room.dto';
import { RoomsService } from './rooms.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: '단순 Room 데이터 가져오기' })
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
   * ## Room 조회 (사용자 ID를 통해 조회)
   *
   * 사용자 ID에 해당하는 Room 조회
   *
   * ### 필요 데이터:
   * - **userId**: 사용자 ID (number)
   * - **cursorId**: (필수 아님) cursorID (해당 ID부터 검색 시작) (int)
   * - **limit**: 받고 싶은 데이터의 개수 (int)
   */
  @ApiOperation({ summary: '사용자 ID에 해당하는 Room 조회' })
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
   * ## Room 조회 (여러 개)
   *
   * 날짜 별로 조회
   *
   * ### 필요 데이터:
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
   * ## 단일 Room 조회
   *
   * 단일 Room 조회 (1개만 나옴)
   *
   * ### 필요 데이터:
   * - **roomId**: Room ID (number)
   */
  @ApiOperation({ summary: '단일 Room 조회' })
  @Get('id')
  @ApiQuery({ name: 'roomId', description: '조회할 Room의 ID', required: true, example: '1' })
  async getRoomToId(@Query('roomId') id: number, @Res() response: Response) {
    const result: RoomEntity = await this.roomsService.findRoomToId(id);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## Room 추가
   *
   * 새로운 채팅방(Room)을 생성합니다.
   *
   * ### 요청 데이터
   * - **setRoomInputDto**: Room 생성에 필요한 데이터
   */
  @ApiOperation({ summary: 'Room 추가' })
  @ApiBody({ description: 'Room 생성에 필요한 데이터', type: SetRoomInputDto })
  @ApiResponse({
    status: 200,
    description: 'Room이 성공적으로 생성되었습니다.',
    type: RoomResponseDto,
  })
  @Post('')
  async setRoomToId(@Body() setRoomInputDto: SetRoomInputDto, @Res() response: Response) {
    const result: RoomResponseDto = await this.roomsService.setRoomToId(setRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## Room 데이터 수정
   *
   * roomId를 기반으로 해당 Room의 전반적인 감정을 수정합니다.
   *
   * ### 요청 데이터
   * - **updateRoomInputDto**: Room ID와 업데이트할 감정 값을 포함한 데이터
   */
  @ApiOperation({ summary: 'Room 데이터 수정' })
  @ApiBody({
    description: 'Room ID와 업데이트할 감정 값을 포함한 데이터',
    type: UpdateRoomInputDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Room 데이터가 성공적으로 수정되었습니다.',
    type: RoomPatchResponseDto,
  })
  @Patch('')
  async updateRoomSent(@Body() updateRoomInputDto: UpdateRoomInputDto, @Res() response: Response) {
    const result: RoomPatchResponseDto = await this.roomsService.updateRoomToId(updateRoomInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
