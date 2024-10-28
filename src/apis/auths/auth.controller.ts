import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { statusCode } from 'src/commons/exception/status.code';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { KakaoRequest } from './interface/kakao.interface';

@Controller('oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: kakao/authorize - 인가 코드 요청
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() request: Request) {}

  // TODO: kakao/token - 토큰 발급
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(
    @Req() request: KakaoRequest,
    @Res() response: Response, // : Promise<KakaoLoginAuthOutputDto>
  ) {
    const { user } = request;
    console.log(user);
    return response.send(user);
    // return this.authService.kakaoLogin(req, res);
  }
}
