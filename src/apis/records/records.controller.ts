import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Response, response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { GetRecordDto, GetRecordInputDto, GetRecordSelectDto, GetRecordUpdateDto } from './dto/get-record.dto';
import { SetRecordInputDto, SetRecordInputRecordIdDto, UpdateRecordDto } from './dto/set-record.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';

@ApiTags('Record (채팅방 관련 API) - 특정 Room(날짜) 속 생성되는 대화방')
@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  /**
   * ## 전체 Record 불러오기
   *
   * 전체 채팅방(Record) 불러오기
   *
   * ### 응답 데이터
   * - **rec_id**: Record ID (채팅방 ID)
   * - **rec_sent**: 해당 채팅방의 감정
   * - **rec_summary**: 해당 채팅방 대화 내용의 요약
   * - **created_at**: 채팅방 생성 일자
   * */
  @ApiOperation({ summary: '전체 Record 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Record를 불러옴',
    type: [GetRecordDto], // 배열 형태로 GetChatInputDto 사용
  })
  @Get('')
  async getAll(@Res() response: Response) {
    const result: GetRecordDto[] = await this.recordsService.findAll();

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## 특정 Room ID에 해당하는 Record 조회
   *
   * 특정 날짜에 해당하는 채팅방들을 조회합니다.
   * - `Room` - 특정 날짜에 대화한 채팅방(Record)의 집합이라고 생각하면 됨
   *
   * ### 요청 데이터
   * - **roomId**: Room ID (날짜 ID)
   * - **cursorId**: 페이지네이션을 위한 커서 ID. 처음 조회 시에는 필요하지 않으며 이후 조회 시 전달된 cursorId를 사용.
   * - **limit**: 한 번에 가져올 Record 개수 (기본값: 10)
   * */
  @ApiOperation({ summary: '특정 날짜의 Record 조회' })
  @ApiQuery({ name: 'roomId', description: 'Room(날짜) ID', required: true, example: 1 })
  @ApiQuery({ name: 'cursorId', description: '페이지네이션 커서 ID', required: false })
  @ApiQuery({ name: 'limit', description: '가져올 채팅방의 개수', required: false, example: 10 })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Record를 불러옴',
    type: [GetRecordSelectDto], // 배열 형태로 GetChatInputDto 사용
  })
  @Get('room')
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
   * ## 특정 Record ID에 해당하는 Record 조회
   *
   * 특정 채팅방에 해당하는 채팅방을 찾아 조회합니다.
   *
   * ### 요청 Param - 요청 시 Route에 원하는 Record Id를 넣으면 됨
   * - **recordId**: Record ID (채팅방 ID)
   */
  @ApiOperation({ summary: '특정 Record ID로 Record 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Record를 불러옴',
    type: GetRecordDto,
  })
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
   * ## Record 등록 (채팅방 등록)
   *
   * - Record ID와 업데이트할 감정 및 요약 내용을 포함하여 Record를 수정합니다.
   *
   * ### 요청 Body
   * - **roomId**: Room ID (날짜 ID) (number)
   */
  @ApiOperation({ summary: 'Record 등록 (채팅방 등록)' })
  @ApiBody({ type: SetRecordInputDto, description: '채팅방을 추가할 특정 Room ID (날짜 ID)' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Record를 등록함',
    type: GetRecordInputDto,
  })
  @ApiBearerAuth() // Bearer 인증 표시
  @Post()
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
  async setRecord(@Body() setRecordInputDto: SetRecordInputDto, @Res() response: Response) {
    const result: GetRecordInputDto = await this.recordsService.setRecord(setRecordInputDto);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## Record 업데이트 (채팅방 정보 수정)
   *
   * ### 요청 Body
   * - **recordId**: record ID (채팅방 ID) (number)
   * - **recordSent**: 채팅방의 감정 인덱스 (주 감정에 해당하는 인덱스 번호) (number)
   * - **recordSummary**: 채팅방 내용 요약 (string)
   */
  @ApiOperation({ summary: 'Record 업데이트 (채팅방 데이터 수정)' })
  @ApiBody({ type: UpdateRecordDto, description: '채팅방 정보를 업데이트하기 위한 데이터' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 Record를 수정함',
    type: GetRecordInputDto,
  })
  @ApiBearerAuth() // Bearer 인증 표시
  @Patch()
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
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
