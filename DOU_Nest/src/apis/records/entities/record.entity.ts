import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from 'src/apis/auths/entities/user.entity';

@Entity()
export class RecordEntity {
  @PrimaryGeneratedColumn('increment')
  rec_id: number;

  @CreateDateColumn()
  rec_date: Date;

  @Column({ type: 'text', comment: '기록 대화 요약' })
  rec_summary: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => ChatEntity, (chat) => chat.chat_id)
  chats: ChatEntity[];

  @JoinColumn()
  @ManyToOne(() => UserEntity, (user) => user.user_id)
  user_id: number;
}
