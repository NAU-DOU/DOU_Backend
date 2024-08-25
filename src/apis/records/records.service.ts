import { Injectable } from '@nestjs/common';
import { RecordEntity } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRecordDto, GetRecordInputDto, GetRecordUpdateDto } from './dto/get-record.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { SetRecordInputDto, SetRecordInputRecordIdDto, UpdateRecordDto } from './dto/set-record.dto';
import { RoomEntity } from '../rooms/entities/room.entity';
import { CustomException } from 'src/commons/exception/custom.exception';
import { statusCode } from 'src/commons/exception/status.code';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  /**
   * TEST
   */
  async findAll(): Promise<GetRecordDto[]> {
    const records = await this.recordRepository.find();
    return records.map((record) => {
      return plainToClass(GetRecordDto, record);
    });
  }

  // roomID
  async getRecordsToRoomId(inputRecordDto: SetRecordInputDto): Promise<GetRecordDto[]> {
    const { roomId } = inputRecordDto;
    const records = await this.recordRepository.find({
      where: { room: { room_id: roomId } },
    });
    return records.map((record) => {
      return plainToClass(GetRecordDto, record);
    });
  }

  // recordId
  async getRecordToRecordId(inputRecordDto: SetRecordInputRecordIdDto): Promise<GetRecordDto> {
    const { recordId } = inputRecordDto;
    const record = await this.recordRepository.findOne({
      where: { rec_id: recordId },
    });
    return plainToClass(GetRecordDto, record);
  }

  async setRecord(setRecordInputDto: SetRecordInputDto): Promise<GetRecordInputDto> {
    const { roomId } = setRecordInputDto;
    const room = await this.roomRepository.findOne({ where: { room_id: roomId } });

    if (!room) {
      throw new Error(`Room with id ${roomId} not found`);
    }

    const record = new RecordEntity();
    record.room = room;
    record.rec_sent = -1;
    record.rec_summary = '';

    const data = await this.recordRepository.save(record);

    return plainToClass(GetRecordInputDto, {
      recordId: data.rec_id,
      roomId: data.room.room_id,
      recordSent: data.rec_sent,
      recordSummary: data.rec_summary,
      createdAt: data.created_at,
    });
  }

  async updateRecord(updateRecordDto: UpdateRecordDto): Promise<GetRecordUpdateDto> {
    const { recordId, recordSent, recordSummary } = updateRecordDto;
    const record = await this.recordRepository.findOne({
      where: { rec_id: recordId },
    });

    if (!record) throw new CustomException(statusCode.NOT_FOUND, statusCode.NOT_FOUND['status']);
    record.rec_sent = recordSent;
    record.rec_summary = recordSummary;

    const result = await this.recordRepository.save(record);

    return plainToClass(GetRecordUpdateDto, {
      recordId: result.rec_id,
      recordSent: result.rec_sent,
      recordSummary: result.rec_summary,
      createdAt: result.created_at,
    });
  }
}
