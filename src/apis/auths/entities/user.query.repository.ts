import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserQueryRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  // 사용자 정보 검색
  async findUser(user: Partial<UserEntity>): Promise<UserEntity | null> {
    return await this.findOne({ where: { user_email: user.user_email, user_status: 1 } });
  }

  // 사용자 생성
  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }

  // 사용자 정보 저장
  async saveUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }

  // 특정 사용자 ID로 사용자 조회
  async findId(userId: number): Promise<UserEntity | null> {
    return await this.findOne({ where: { user_id: userId } });
  }
}
