import { UserEntity } from 'src/apis/auths/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecordEntity } from './record.entity';

@Entity()
export class CalendarEntity {
  @PrimaryGeneratedColumn('increment')
  cal_id: number;

  @CreateDateColumn()
  cal_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'tinyint', comment: '0-Not User, 1-행복, 2-놀람, 3-중립, 4-슬픔, 5-역겨움, 6-화남, 7-두려움' })
  cal_sent: number;

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.user_id)
  user_id: number;

  @OneToMany(() => RecordEntity, (rec) => rec.rec_id)
  chats: RecordEntity[];
}
