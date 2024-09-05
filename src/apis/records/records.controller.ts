import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Response, response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { GetRecordDto, GetRecordInputDto, GetRecordSelectDto, GetRecordUpdateDto } from './dto/get-record.dto';
import { SetRecordInputDto, SetRecordInputRecordIdDto, UpdateRecordDto } from './dto/set-record.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  /**
   * Record Test API
   * 전체 Record 불러오기
   */
  @Get('')
  async getAll(@Res() response: Response) {
    const result: GetRecordDto[] = await this.recordsService.findAll();

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Record Get Room Id
   * - cursorId: 없이 보내도 됨 (맨 처음 조회 시), 이후 데이터에 전달되는 cursorId 그대로 쿼리에 추가하면 됨
   * - limit: 몇 개씩 가져올 지 (default: 10개)
   *    */
  @Get('room')
  @ApiQuery({ name: 'cursorId', required: false })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async getRecordToRoomId(
    @Query('roomId') roomId: number,
    @Query('cursorId') cursorId: number = 1,
    @Query('limit') limit: number = 10,
    @Res() response: Response,
  ) {
    const result: { data: GetRecordSelectDto[]; cursor: number } = await this.recordsService.getRecordsToRoomId(
      cursorId,
      limit,
      roomId,
    );

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result.data,
      cursorId: result.cursor,
    });
  }

  /**
   * Record Get Record Id
   * Record Id에 따른 Record 불러오기
   */
  @Get(':recordId')
  @ApiParam({ name: 'recordId', type: String })
  async getRecordToRecordId(@Param('recordId') recId: number, @Res() response: Response) {
    const setRecordInputRecordIdDto = new SetRecordInputRecordIdDto();
    setRecordInputRecordIdDto.recordId = recId;
    const result: GetRecordDto = await this.recordsService.getRecordToRecordId(setRecordInputRecordIdDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Record Set
   * Record 등록하기
   */
  @Post()
  async setRecord(@Body() setRecordInputDto: SetRecordInputDto, @Res() response: Response) {
    const result: GetRecordInputDto = await this.recordsService.setRecord(setRecordInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Record Update\n
   * Record Id, 감정, 요약 넣으면 수정
   */
  @Patch()
  async updateRecord(@Body() updateRecordDto: UpdateRecordDto, @Res() response: Response) {
    const result: GetRecordUpdateDto = await this.recordsService.updateRecord(updateRecordDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}

/**
 * Record 추가 - 방
 * Calendar ID / 각 문단(주제) 별로 방 만들기 / 각 문단 별 요약
 * 각 주제 내용 요약 및 해당 내용 기반 감정 내용
 */
