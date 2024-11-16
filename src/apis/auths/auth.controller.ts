import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { statusCode } from 'src/commons/exception/status.code';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { KakaoRequest } from './interface/kakao.interface';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogoutAuthOutputDto } from './dto/user.auth.dto';
import { CurrentUser } from './dto/current.user.decorator';
import { JwtAuthGuard, JwtKakaoAuthGuard } from './strategies/kakao.strategy';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * ## 카카오 인가 코드 요청 API
   *
   * - **주의:** 아래 링크를 직접 클릭하여 접근해야 함
   * - Swagger의 **GET 요청**이나 **Postman/Insomnia 등**을 통해 요청하는 것은 동작하지 않을 확률이 높음
   *
   * [인가 코드 요청](https://dev.nau-dou.shop/oauth/kakao)
   */
  @ApiTags('Kakao Auth (카카오 소셜로그인)')
  @ApiOperation({ summary: '카카오 소셜로그인 트리거 API (스웨거 동작 X)' })
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() request: Request) {}

  /**
   * ## 토큰 발급
   *
   * - **주의:** **oauth/kakao**를 실행하면 해당 route로 **자동적으로 callback**되는 API
   * - **Swagger나 Postman/Insomnia 등**을 통해 요청하면 오류만 뜨고 말 것임
   */
  // TODO: kakao/token - 토큰 발급
  @ApiTags('Kakao Auth (카카오 소셜로그인)')
  @ApiOperation({ summary: '카카오 소셜로그인 콜백 API (사용X)' })
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(
    @Req() request: KakaoRequest,
    @Res() response: Response, // : Promise<KakaoLoginAuthOutputDto>
  ) {
    const result = await this.authService.kakaoLogin(request, response);
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
      // TODO: 사용자 ID, 사용자 이름 수정하기
    });
  }

  /**
   * ## 로그인 연장 (리프레시 토큰 요청 API)
   *
   * - 보낼 때 Cookie를 함께 보내야 함 (헤더의 쿠키!)
   * - Cookie에 보낼 때는, **eid_refresh_token: "refresh token 값"**
   * - ### 실제 Swagger UI 에서는 쿠키를 테스트할 수가 없어서 **브라우저나 Postman/Insomnia로 직접 쿠키를 포함**해서 테스트 해야 함!
   */
  @ApiTags('Kakao Auth (카카오 소셜로그인)')
  @ApiBearerAuth('access-token') // Bearer 인증 표시
  @ApiCookieAuth('eid_refresh_token') // 쿠키 인증 추가
  @ApiOperation({ summary: '리프레시 토큰 요청 API' })
  @Post('kakao/refresh')
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
  async silentKakaoRefresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.silentKakaoRefresh(request, response);
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## 로그아웃
   * - Bearer <JWT 토큰> 형식으로 JWT 토큰 전달이 필요해용
   */
  @ApiTags('Kakao Auth (카카오 소셜로그인)')
  @ApiBearerAuth('access-token') // Bearer 인증 표시
  @ApiOperation({ summary: '카카오 로그아웃 API' })
  @Post('kakao/logout')
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
  async kakaoLogout(@Res({ passthrough: true }) response: Response, @CurrentUser() user) {
    const result = await this.authService.kakaoLogout(user, response);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
