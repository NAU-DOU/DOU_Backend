import { RecordEntity } from 'src/apis/records/entities/record.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({ type: 'varchar', length: 50, comment: '유저 이메일' })
  user_email: string;

  // NOTE: 엔티티 더 추가해야 됨!!
  @Column({ type: 'text', comment: '유저 비밀번호' })
  user_password: string;

  @Column({ type: 'varchar', length: 20, comment: '유저 닉네임' })
  user_nickname: string;

  @Column({ type: 'tinyint', default: 1, comment: '0-inactive, 1-active' })
  user_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  access_at: Date;

  @DeleteDateColumn()
  resign_at: Date;

  @OneToMany(() => RecordEntity, (record) => record.rec_id)
  chats: RecordEntity[];
}
