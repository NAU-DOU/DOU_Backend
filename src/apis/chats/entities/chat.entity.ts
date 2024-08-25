import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordEntity } from '../../records/entities/record.entity';
import { toZonedTime } from 'date-fns-tz';
import { add } from 'date-fns';

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn('increment')
  chat_id: number;

  @Column({ type: 'text', comment: '대화 내용' })
  chat_context: string;

  @Column({ type: 'tinyint', comment: '0-Not User, 1-행복, 2-놀람, 3-중립, 4-슬픔, 5-역겨움, 6-화남, 7-두려움' })
  chat_sent: number;

  @Column({ type: 'tinyint', comment: '사용자 여부 | 0-notUser, 1-User' })
  is_user: number;

  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: 'chat_rec_id' })
  @ManyToOne(() => RecordEntity, (record) => record.chats)
  record: RecordEntity;

  @BeforeInsert()
  setTimeStamps() {
    const timeZone = 'Asia/Seoul';
    const now = new Date(); // 현재 UTC 날짜
    const zonedDate = toZonedTime(now, timeZone); // 타임존으로 변환
    const date = add(zonedDate, { hours: 9 }); // +9

    this.created_at = date;
  }
}
