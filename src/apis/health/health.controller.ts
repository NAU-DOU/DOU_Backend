import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check (서버 상태 확인)')
@Controller('health')
export class HealthController {
  /**
   * 서버 Health Check - 서버 죽으면 얘가 안돌아가유
   * @example ['health']
   */

  @ApiOperation({ summary: '얘가 안되면 서버 죽은 것' })
  @Get()
  getAll(): string {
    return "I'm Healthy Happy Day!";
  }
}
