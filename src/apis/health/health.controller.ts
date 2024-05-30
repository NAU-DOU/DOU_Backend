import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  /**
   * 서버 Health Check - 서버 죽으면 얘가 안돌아가유
   * @example ['health']
   */

  @Get()
  getAll(): string {
    return "I'm Healthy Happy Day!";
  }
}
