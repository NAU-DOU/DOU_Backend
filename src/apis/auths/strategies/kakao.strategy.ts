import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
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

@Injectable()
export class JwtKakaoAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer 토큰에서 JWT 추출

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
      const payload = await this.jwtService.verify(token, {
        secret: secret,
      }); // JWT 검증
      request.user = payload; // 검증된 사용자 정보를 요청 객체에 추가
      return true; // 인증 성공
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid access token'); // 인증 실패
    }
  }
}
