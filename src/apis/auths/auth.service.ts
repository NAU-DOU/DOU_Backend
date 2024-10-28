import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoRequest } from './interface/kakao.interface';
import { UserQueryRepository } from './entities/user.query.repository';
import { UserEntity } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly configService: ConfigService,
  ) {}

  async kakaoLogin(req: KakaoRequest, res: Response) {
    try {
      const { user } = req;
      user.type = 'kakao';

      const eUser: Partial<UserEntity> = {
        user_email: user.email,
        user_nickname: user.name,
        user_type: user.type,
      };

      let findUser = await this.userQueryRepository.findUser(eUser);

      if (!findUser) {
        findUser = await this.userQueryRepository.createUser(eUser);
      }
      console.log(findUser);

      const findUserPayload = { id: findUser.user_id };
      const eid_access_token = jwt.sign(findUserPayload, this.configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'), {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      });
      const eid_refresh_token = jwt.sign({}, this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'), {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
        audience: String(findUser.user_id),
      });
      /* refreshToken 필드 업데이트 */
      findUser.eid_refresh_token = eid_refresh_token;
      await this.userQueryRepository.save(findUser);

      // 쿠키 설정
      const now = new Date();
      now.setDate(now.getDate() + +this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DATE'));
      // res.cookie('eid_refresh_token', eid_refresh_token, {
      //   expires: now,
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production' ? true : false,
      //   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      // });
      return {
        ok: true,
        eid_access_token,
      };
    } catch (error) {
      return { ok: false, error: '카카오 로그인 인증을 실패 하였습니다.' };
    }
  }
}
