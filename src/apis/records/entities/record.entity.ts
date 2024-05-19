import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { CalendarEntity } from './calendar.entity';

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

  @OneToMany(() => ChatEntity, (chat) => chat.chat_id)
  chats: ChatEntity[];

  @JoinColumn() // 달력 아이디
  @ManyToOne(() => CalendarEntity, (calendar) => calendar.cal_id)
  cal_id: number;
}
