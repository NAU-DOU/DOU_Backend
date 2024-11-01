import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { statusCode } from 'src/commons/exception/status.code';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { KakaoRequest } from './interface/kakao.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LogoutAuthOutputDto } from './dto/user.auth.dto';
import { CurrentUser } from './dto/current.user.decorator';
import { JwtAuthGuard, JwtKakaoAuthGuard } from './strategies/kakao.strategy';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 인가 코드 요청
   */
  // TODO: kakao/authorize - 인가 코드 요청
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() request: Request) {}

  /**
   * 토큰 발급
   */
  // TODO: kakao/token - 토큰 발급
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
    });
  }

  /**
   * 로그인 연장
   */
  @Post('kakao/refresh')
  async silentKakaoRefresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.silentKakaoRefresh(request, response);
    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * 로그아웃
   */
  @Post('kakao/logout')
  @UseGuards(JwtKakaoAuthGuard)
  async kakaoLogout(@Res({ passthrough: true }) response: Response, @CurrentUser() user) {
    const result = await this.authService.kakaoLogout(user, response);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
