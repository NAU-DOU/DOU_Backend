import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordEntity } from './record.entity';

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

  @JoinColumn()
  @ManyToOne(() => RecordEntity, (record) => record.rec_id)
  rec_id: RecordEntity;
}
