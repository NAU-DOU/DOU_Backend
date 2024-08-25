import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from '../../chats/entities/chat.entity';
import { toZonedTime } from 'date-fns-tz';
import { add } from 'date-fns';
import { RoomEntity } from 'src/apis/rooms/entities/room.entity';

@Entity()
export class RecordEntity {
  @PrimaryGeneratedColumn('increment') // 기록 아이디
  rec_id: number;

  @Column({ type: 'tinyint', comment: '0-Not User, 1-행복, 2-놀람, 3-중립, 4-슬픔, 5-역겨움, 6-화남, 7-두려움' })
  rec_sent: number;

  @Column({ type: 'text', comment: '기록 대화 요약' })
  rec_summary: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ChatEntity, (chat) => chat.record)
  chats: ChatEntity[];

  @JoinColumn({ name: 'rec_room_id' }) // 달력 아이디
  @ManyToOne(() => RoomEntity, (room) => room.records)
  room: RoomEntity;

  @BeforeInsert()
  setTimeStamps() {
    const timeZone = 'Asia/Seoul';
    const now = new Date(); // 현재 UTC 날짜
    const zonedDate = toZonedTime(now, timeZone); // 타임존으로 변환
    const date = add(zonedDate, { hours: 9 }); // +9

    this.created_at = date;
  }
}
