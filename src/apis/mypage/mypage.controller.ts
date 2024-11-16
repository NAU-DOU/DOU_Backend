import { Body, Controller, Get, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { response, Response } from 'express';
import { statusCode } from 'src/commons/exception/status.code';
import { MyPageService } from './mypage.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MyRoomUseDateResDTO, UserSentCountResDTO } from './dto/my-page-response.dto';
import { JwtKakaoAuthGuard } from '../auths/strategies/kakao.strategy';
import { CurrentUser } from '../auths/dto/current.user.decorator';
import { GetUserSentCountReqDTO } from './dto/my-page-request.dto';

@ApiTags('MyPage (마이페이지 관련 API)')
@Controller('mypage')
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}
  /**
   * ## 사용자 사용 기간 응답 API
   *
   * userId를 받아 사용자가 도우를 얼마나 사용했는지 응답받는 API
   *
   * ### 요청 데이터
   */
  @ApiOperation({ summary: '사용자 사용 기간 응답 API' })
  @ApiResponse({
    status: 200,
    description: '응답 성공',
    type: MyRoomUseDateResDTO,
  })
  @ApiBearerAuth('access-token') // Bearer 인증 표시
  @Post('usedate')
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
  async updateRoomSent(@Res() response: Response, @CurrentUser() user) {
    const result: MyRoomUseDateResDTO = await this.myPageService.calUseUserDate(user);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }

  /**
   * ## 사용자 감정 개수 전달 API
   *
   * 감정 코드를 받아 사용자가 도우를 얼마나 사용했는지 응답받는 API
   *
   * ### 요청 데이터
   * - userSent: number
   */
  @ApiOperation({ summary: '사용자 감정 개수 전달 API' })
  @ApiResponse({
    status: 200,
    description: '응답 성공',
    type: UserSentCountResDTO,
  })
  @ApiBody({ type: GetUserSentCountReqDTO, description: '개수를 세고 싶은 감정 코드(SentCode)' })
  @ApiBearerAuth('access-token') // Bearer 인증 표시
  @Post('sentcount')
  @UseGuards(JwtKakaoAuthGuard) // JWT 인증 검사
  async getUserSentCount(
    @Body() getUserSentCountReqDTO: GetUserSentCountReqDTO,
    @Res() response: Response,
    @CurrentUser() user,
  ) {
    const result: UserSentCountResDTO = await this.myPageService.countUserSent(user, getUserSentCountReqDTO);

    response.status(200).json({
      ...statusCode.SUCCESS,
      data: result,
    });
  }
}
