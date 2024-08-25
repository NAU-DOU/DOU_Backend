import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Response, response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { GetRecordDto, GetRecordInputDto, GetRecordUpdateDto } from './dto/get-record.dto';
import { SetRecordInputDto, SetRecordInputRecordIdDto, UpdateRecordDto } from './dto/set-record.dto';

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
   * RoomId에 따른 Record들 불러오기
   */
  @Get('room')
  async getRecordToRoomId(@Query('roomId') inputRecordDto: SetRecordInputDto, @Res() response: Response) {
    const result: GetRecordDto[] = await this.recordsService.getRecordsToRoomId(inputRecordDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * Record Get Record Id
   * Record Id에 따른 Record 불러오기
   */
  @Get(':recordId')
  async getRecordToRecordId(
    @Param('recordId') setRecordInputRecordIdDto: SetRecordInputRecordIdDto,
    @Res() response: Response,
  ) {
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
