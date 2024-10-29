import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoRequest } from './interface/kakao.interface';
import { Response, Request } from 'express';
import { UserQueryRepository } from './entities/user.query.repository';
import { UserEntity } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { isEmpty } from 'class-validator';
import { SilentRefreshAuthOutputDto } from './dto/user.auth.dto';

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
        // 유저가 없다면 유저 생성
        findUser = await this.userQueryRepository.createUser(eUser);
      }

      const findUserPayload = {
        id: findUser.user_id,
        nickname: findUser.user_nickname,
      };
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

      // 로그인 시 access at 업데이트

      // 쿠키 설정
      const now = new Date();
      now.setDate(now.getDate() + parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_DATE')) / 1000);
      res.cookie('eid_refresh_token', eid_refresh_token, {
        expires: now,
        httpOnly: true, // 쿠키에 자바스크립트로 접근할 수 없음 (XSS 공격 방지)
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
      });
      return {
        ok: true,
        eid_access_token,
      };
    } catch (error) {
      console.log(error);
      return { ok: false, error: '카카오 로그인 인증을 실패 하였습니다.' };
    }
  }

  async silentKakaoRefresh(req: Request, res: Response): Promise<SilentRefreshAuthOutputDto> {
    try {
      // refreshToken 유효성 검사
      const getRefreshToken = req.cookies['eid_refresh_token'];

      if (isEmpty(getRefreshToken)) {
        return { ok: false };
      }
      let userId: string | string[] | null;
      jwt.verify(
        getRefreshToken,
        this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
        (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | undefined) => {
          if (err) {
            res.clearCookie('eid_refresh_token');
            return { ok: false, error: '토큰이 유효하지 않습니다. 로그인이 필요합니다' };
          }
          userId = decoded.aud;
        },
      );

      // 로그아웃 후에는 silent Refresh 무시
      const loginUser = await this.userQueryRepository.findId(+userId); // userId를 숫자형으로 변환하기 위함

      // accessToken 재발급
      const payload = {
        id: loginUser.user_id,
        nickname: loginUser.user_nickname,
      };

      const eid_access_token = jwt.sign(payload, this.configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'), {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      });

      return {
        ok: true,
        eid_access_token,
      };
    } catch (error) {
      return { ok: false, error: '로그인 연장에 실패하였습니다.' };
    }
  }
}
