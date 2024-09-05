import { UserEntity } from 'src/apis/auths/entities/user.entity';
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
import moment from 'moment-timezone';
import { format, toZonedTime } from 'date-fns-tz';
import { add } from 'date-fns';
import { RecordEntity } from 'src/apis/records/entities/record.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn('increment')
  room_id: number;

  // @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  room_date: Date;

  // @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'tinyint',
    comment: '해당 Room(전체 대화)의 전반적인 감정 상태, 1-행복, 2-놀람, 3-중립, 4-슬픔, 5-역겨움, 6-화남, 7-두려움',
    default: 0,
  })
  room_sent: number;

  @JoinColumn({ name: 'room_user_id' })
  @ManyToOne(() => UserEntity, (user) => user.rooms)
  user: UserEntity;

  @OneToMany(() => RecordEntity, (rec) => rec.rec_id)
  records: RecordEntity[];

  @BeforeInsert()
  setTimeStamps() {
    const timeZone = 'Asia/Seoul';
    const now = new Date(); // 현재 UTC 날짜
    const zonedDate = toZonedTime(now, timeZone); // 타임존으로 변환
    const date = add(zonedDate, { hours: 9 }); // +9

    this.room_date = date;
    this.created_at = date;
  }
}
