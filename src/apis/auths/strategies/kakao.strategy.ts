import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_CLIENT'),
      clientSecret: configService.get('KAKAO_SECRET'),
      callbackURL: `${configService.get('KAKAO_CALLBACK_URL')}/oauth/kakao/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;
      const user = {
        email: _json.kakao_account.email,
        name: _json.properties.nickname,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
